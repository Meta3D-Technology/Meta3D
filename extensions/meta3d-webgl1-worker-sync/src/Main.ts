import { state as meta3dState } from "meta3d-type"
import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D } from "meta3d-type/src/Index"
import { dependentExtensionNameMap } from "meta3d-webgl1-worker-sync-protocol/src/service/DependentExtensionType"
import { initRenderData, renderData, service } from "meta3d-webgl1-worker-sync-protocol/src/service/ServiceType"
import { state } from "meta3d-webgl1-worker-sync-protocol/src/state/StateType"
import { componentName as transformComponentName, state as transformState } from "meta3d-component-transform-protocol"
import { componentName as geometryComponentName, geometry, state as geometryState } from "meta3d-component-geometry-protocol"
import { componentName as pbrMaterialComponentName, pbrMaterial, state as pbrMaterialState } from "meta3d-component-pbrmaterial-protocol"
import { componentName as basicCameraViewComponentName } from "meta3d-component-basiccameraview-protocol"
import { componentName as perspectiveCameraProjectionComponentName, perspectiveCameraProjection, dataName as perspectiveCameraProjectionDataName, pMatrix } from "meta3d-component-perspectivecameraprojection-protocol"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { createGetMainWorkerDataStream, createGetOtherWorkerDataStream } from "meta3d-commonlib-ts/src/CreateWorkerDataStreamService"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { getActiveCameraView, getViewWorldToCameraMatrix } from "meta3d-component-commonlib"

export let getExtensionService: getExtensionServiceMeta3D<
	dependentExtensionNameMap,
	service
> = (api, _) => {
	return {
		sendInitRenderData: (engineCoreService, engineCoreState, isDebug, worker, offscreenCanvas) => {
			let usedGeometryContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, geometryComponentName)
			let allGeometryIndices = engineCoreService.getAllComponents<geometry>(usedGeometryContribute)
			let geometryState = getExn(engineCoreService.getComponentState<geometryState>(engineCoreState, geometryComponentName))

			let usedPBRMaterialContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, pbrMaterialComponentName)
			let allMaterialIndices = engineCoreService.getAllComponents<pbrMaterial>(usedPBRMaterialContribute)
			let pbrMaterialState = getExn(engineCoreService.getComponentState<pbrMaterialState>(engineCoreState, pbrMaterialComponentName))

			let transformState = getExn(engineCoreService.getComponentState<transformState>(engineCoreState, transformComponentName))

			getExn(worker).postMessage({
				operateType: "SEND_INIT_RENDER_DATA",
				canvas: offscreenCanvas,
				allGeometryIndices: allGeometryIndices,
				allMaterialIndices: allMaterialIndices,
				isDebug: isDebug,
				transformCount: transformState.config.transformCount,
				geometryCount: geometryState.config.geometryCount,
				geometryPointCount: geometryState.config.geometryPointCount,
				pbrMaterialCount: pbrMaterialState.config.pbrMaterialCount,
				transformBuffer: transformState.buffer,
				geometryBuffer: geometryState.buffer,
				pbrMaterialBuffer: pbrMaterialState.buffer
			}, [offscreenCanvas])
		},
		getInitRenderData: (mostService) => {
			let initRenderData: initRenderData

			return mostService.map(() => {
				return initRenderData
			}, createGetMainWorkerDataStream(
				mostService,
				(event: MessageEvent) => {
					initRenderData = {
						offscreenCanvas: event.data.canvas,
						allGeometryIndices: event.data.allGeometryIndices,
						allMaterialIndices: event.data.allMaterialIndices,
						transformCount: event.data.transformCount,
						geometryCount: event.data.geometryCount,
						geometryPointCount: event.data.geometryPointCount,
						pbrMaterialCount: event.data.pbrMaterialCount,
						transformBuffer: event.data.transformBuffer,
						geometryBuffer: event.data.geometryBuffer,
						pbrMaterialBuffer: event.data.pbrMaterialBuffer,
					}
				},
				"SEND_INIT_RENDER_DATA",
				self as any as Worker
			))
		},
		sendFinishInitRenderData: () => {
			postMessage({
				operateType: "FINISH_SEND_INIT_RENDER_DATA"
			})
		},
		getFinishInitRenderData: (mostService, worker) => {
			return createGetOtherWorkerDataStream(mostService, "FINISH_SEND_INIT_RENDER_DATA", worker)
		},
		sendBeginLoopData: (worker) => {
			worker.postMessage({
				operateType: "SEND_BEGIN_RENDER"
			})

		},
		initConcatGetBeginLoopData: (mostService, initFunc, loopFunc, meta3dState, isDebug) => {
			let tempMeta3DState: nullable<meta3dState> = null

			initFunc(meta3dState, isDebug).then((meta3dState) => {
				console.log("finish init on worker thread");

				tempMeta3DState = meta3dState
			})

			// TODO use pipe

			return mostService.drain(
				mostService.tap(
					(_) => {
						loopFunc(getExn(tempMeta3DState)).then((meta3dState) => {
							tempMeta3DState = meta3dState
						})
					},
					mostService.filter(
						(event) => {
							console.log(event);
							return event.data.operateType === "SEND_BEGIN_RENDER";
						},
						mostService.fromEvent<MessageEvent, Window & typeof globalThis>("message", self, false)
					)
				)
			)

		},
		sendRenderData: (engineCoreService, engineCoreState, isDebug, worker, renderDataBufferData) => {
			let usedTransformContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, transformComponentName)
			let usedBasicCameraViewContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, basicCameraViewComponentName)
			let usedPerspectiveCameraProjectionContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, perspectiveCameraProjectionComponentName)

			let cameraView = getExn(
				getActiveCameraView(usedBasicCameraViewContribute, engineCoreService, isDebug)
			)

			let viewMatrix = getViewWorldToCameraMatrix(usedBasicCameraViewContribute, engineCoreService, usedTransformContribute, cameraView)
			let gameObject = engineCoreService.getComponentGameObjects(usedBasicCameraViewContribute, cameraView)[0]

			let cameraProjection = getExn(
				engineCoreService.getComponent<perspectiveCameraProjection>(usedPerspectiveCameraProjectionContribute, gameObject)
			)

			let pMatrix = getExn(engineCoreService.getComponentData<perspectiveCameraProjection, pMatrix>(usedPerspectiveCameraProjectionContribute, cameraProjection, perspectiveCameraProjectionDataName.pMatrix))

			getExn(worker).postMessage({
				operateType: "SEND_RENDER_DATA",
				camera: {
					viewMatrix,
					pMatrix
				},
				renderDataBufferData
			})

		},
		getRenderData: (mostService) => {
			let renderData: renderData

			return mostService.map(() => {
				return renderData
			}, createGetMainWorkerDataStream(
				mostService,
				(event: MessageEvent) => {
					renderData = {
						camera: event.data.camera,
						renderDataBufferData: event.data.renderDataBufferData

					}
				},
				"SEND_RENDER_DATA",
				self as any as Worker
			))
		},
		sendFinishRenderData: () => {
			postMessage({
				operateType: "FINISH_SEND_RENDER_DATA"
			})
		},
		getFinishRenderData: (mostService, worker) => {
			return createGetOtherWorkerDataStream(mostService, "FINISH_SEND_RENDER_DATA", worker)
		},
	}
}

export let createExtensionState: createExtensionStateMeta3D<
	state
> = () => {
	return {}
}
