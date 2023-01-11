import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { state } from "meta3d-engine-whole-protocol/src/state/StateType"
import { service } from "meta3d-engine-whole-protocol/src/service/ServiceType"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-engine-whole-protocol/src/service/DependentMapType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { service as engineBasicService } from "meta3d-engine-basic-protocol/src/service/ServiceType"
// import { state as engineBasicState } from "meta3d-engine-basic-protocol/src/state/StateType"
import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
// import { state as engineSceneState } from "meta3d-engine-scene-protocol/src/state/StateType"
import { service as engineRenderService } from "meta3d-engine-render-protocol/src/service/ServiceType"
// import { state as engineRenderState } from "meta3d-engine-render-protocol/src/state/StateType"
import { init, render, update } from "./DirectorAPI"

let _encapsulateSceneAPIReturnState = (meta3dState: meta3dState, func: (engineCoreState: engineCoreState, engineCoreService: engineCoreService) => engineCoreState, api: api, meta3dEngineCoreExtensionName: string): meta3dState => {
	let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, meta3dEngineCoreExtensionName)

	let engineCoreService = api.getExtensionService<engineCoreService>(
		meta3dState,
		meta3dEngineCoreExtensionName
	)

	meta3dState =
		api.setExtensionState(
			meta3dState,
			meta3dEngineCoreExtensionName,
			func(engineCoreState, engineCoreService)
		)

	return meta3dState
}

let _encapsulateSceneAPIReturnData = <Data>(meta3dState: meta3dState, func: (engineCoreState: engineCoreState, engineCoreService: engineCoreService) => Data, api: api, meta3dEngineCoreExtensionName: string): Data => {
	let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, meta3dEngineCoreExtensionName)

	let engineCoreService = api.getExtensionService<engineCoreService>(
		meta3dState,
		meta3dEngineCoreExtensionName
	)

	return func(engineCoreState, engineCoreService)
}

let _encapsulateSceneAPIReturnStateAndData = <Data>(meta3dState: meta3dState, func: (engineCoreState: engineCoreState, engineCoreService: engineCoreService) => [engineCoreState, Data], api: api, meta3dEngineCoreExtensionName: string): [meta3dState, Data] => {
	let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, meta3dEngineCoreExtensionName)

	let engineCoreService = api.getExtensionService<engineCoreService>(
		meta3dState,
		meta3dEngineCoreExtensionName
	)

	let data = func(engineCoreState, engineCoreService)

	meta3dState =
		api.setExtensionState(
			meta3dState,
			meta3dEngineCoreExtensionName,
			data[0]
		)

	return [meta3dState, data[1]]
}

export let getExtensionService: getExtensionServiceMeta3D<
	dependentExtensionNameMap,
	dependentContributeNameMap,
	service
> = (api, [{
	meta3dBsMostExtensionName,
	meta3dEngineCoreExtensionName,
	meta3dEngineBasicExtensionName,
	meta3dEngineSceneExtensionName,
	meta3dEngineRenderExtensionName,
}, {
}]) => {
		return {
			prepare: (meta3dState: meta3dState, isDebug, canvasSize, ecsConfig, canvas) => {
				// let engineBasicState = api.getExtensionState<engineBasicState>(meta3dState, meta3dEngineBasicExtensionName)

				let engineBasicService = api.getExtensionService<engineBasicService>(
					meta3dState,
					meta3dEngineBasicExtensionName
				)

				meta3dState = engineBasicService.prepare(meta3dState, isDebug)

				// let engineSceneState = api.getExtensionState<engineSceneState>(meta3dState, meta3dEngineSceneExtensionName)

				let engineSceneService = api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionName
				)

				meta3dState = engineSceneService.prepare(meta3dState, isDebug, canvasSize, ecsConfig)


				// let engineRenderState = api.getExtensionState<engineRenderState>(meta3dState, meta3dEngineRenderExtensionName)

				let engineRenderService = api.getExtensionService<engineRenderService>(
					meta3dState,
					meta3dEngineRenderExtensionName
				)

				meta3dState = engineRenderService.prepare(meta3dState, isDebug, canvas)



				return meta3dState
			},
			init: (meta3dState: meta3dState) => {
				let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, meta3dEngineCoreExtensionName)

				let engineCoreService = api.getExtensionService<engineCoreService>(
					meta3dState,
					meta3dEngineCoreExtensionName
				)

				engineCoreState = engineCoreService.init(engineCoreState, meta3dState)



				meta3dState =
					api.setExtensionState(
						meta3dState,
						meta3dEngineCoreExtensionName,
						engineCoreState
					)



				return init(api, meta3dState, meta3dBsMostExtensionName, meta3dEngineCoreExtensionName)
			},
			update: (meta3dState: meta3dState) => {
				return update(api, meta3dState, meta3dBsMostExtensionName, meta3dEngineCoreExtensionName)
			},
			render: (meta3dState: meta3dState) => {
				return render(api, meta3dState, meta3dBsMostExtensionName, meta3dEngineCoreExtensionName)
			},
			scene: {
				gameObject: {
					createGameObject: (meta3dState) => {
						return _encapsulateSceneAPIReturnStateAndData(meta3dState, api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).gameObject.createGameObject, api, meta3dEngineCoreExtensionName)
					},
					getAllGameObjects: (meta3dState) => {
						return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).gameObject.getAllGameObjects(engineCoreState, engineCoreService), api, meta3dEngineCoreExtensionName)
					},
					getTransform: (meta3dState, gameObject) => {
						return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).gameObject.getTransform(engineCoreState, engineCoreService, gameObject), api, meta3dEngineCoreExtensionName)
					},
					addTransform: (meta3dState, gameObject, transform) => {
						return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).gameObject.addTransform(engineCoreState, engineCoreService, gameObject, transform), api, meta3dEngineCoreExtensionName)
					},
					hasTransform: (meta3dState, gameObject) => {
						return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).gameObject.hasTransform(engineCoreState, engineCoreService, gameObject), api, meta3dEngineCoreExtensionName)
					},
					getGeometry: (meta3dState, gameObject) => {
						return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).gameObject.getGeometry(engineCoreState, engineCoreService, gameObject), api, meta3dEngineCoreExtensionName)
					},
					addGeometry: (meta3dState, gameObject, geometry) => {
						return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).gameObject.addGeometry(engineCoreState, engineCoreService, gameObject, geometry), api, meta3dEngineCoreExtensionName)
					},
					hasGeometry: (meta3dState, gameObject) => {
						return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).gameObject.hasGeometry(engineCoreState, engineCoreService, gameObject), api, meta3dEngineCoreExtensionName)
					},
					getPBRMaterial: (meta3dState, gameObject) => {
						return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).gameObject.getPBRMaterial(engineCoreState, engineCoreService, gameObject), api, meta3dEngineCoreExtensionName)
					},
					addPBRMaterial: (meta3dState, gameObject, pbrMaterial) => {
						return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).gameObject.addPBRMaterial(engineCoreState, engineCoreService, gameObject, pbrMaterial), api, meta3dEngineCoreExtensionName)
					},
					hasPBRMaterial: (meta3dState, gameObject) => {
						return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).gameObject.hasPBRMaterial(engineCoreState, engineCoreService, gameObject), api, meta3dEngineCoreExtensionName)
					},
					getBasicCameraView: (meta3dState, gameObject) => {
						return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).gameObject.getBasicCameraView(engineCoreState, engineCoreService, gameObject), api, meta3dEngineCoreExtensionName)
					},
					addBasicCameraView: (meta3dState, gameObject, basicCameraView) => {
						return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).gameObject.addBasicCameraView(engineCoreState, engineCoreService, gameObject, basicCameraView), api, meta3dEngineCoreExtensionName)
					},
					hasBasicCameraView: (meta3dState, gameObject) => {
						return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).gameObject.hasBasicCameraView(engineCoreState, engineCoreService, gameObject), api, meta3dEngineCoreExtensionName)
					},
					getPerspectiveCameraProjection: (meta3dState, gameObject) => {
						return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).gameObject.getPerspectiveCameraProjection(engineCoreState, engineCoreService, gameObject), api, meta3dEngineCoreExtensionName)
					},
					addPerspectiveCameraProjection: (meta3dState, gameObject, perspectiveCameraProjection) => {
						return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).gameObject.addPerspectiveCameraProjection(engineCoreState, engineCoreService, gameObject, perspectiveCameraProjection), api, meta3dEngineCoreExtensionName)
					},
					hasPerspectiveCameraProjection: (meta3dState, gameObject) => {
						return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).gameObject.hasPerspectiveCameraProjection(engineCoreState, engineCoreService, gameObject), api, meta3dEngineCoreExtensionName)
					},
					cloneGameObject: (meta3dState, count, cloneConfig, sourceGameObject) => {
						return _encapsulateSceneAPIReturnStateAndData(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).gameObject.cloneGameObject(engineCoreState, engineCoreService, count, cloneConfig, sourceGameObject), api, meta3dEngineCoreExtensionName)
					},
					getNeedDisposedGameObjects: (meta3dState) => {
						return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).gameObject.getNeedDisposedGameObjects(engineCoreState, engineCoreService), api, meta3dEngineCoreExtensionName)
					},
					disposeGameObjects: (meta3dState, gameObjects) => {
						return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).gameObject.disposeGameObjects(engineCoreState, engineCoreService, gameObjects), api, meta3dEngineCoreExtensionName)
					},
					disposeGameObjectTransformComponent: (meta3dState, gameObject, component) => {
						return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).gameObject.disposeGameObjectTransformComponent(engineCoreState, engineCoreService, gameObject, component), api, meta3dEngineCoreExtensionName)
					},
					disposeGameObjectPBRMaterialComponent: (meta3dState, gameObject, component) => {
						return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).gameObject.disposeGameObjectPBRMaterialComponent(engineCoreState, engineCoreService, gameObject, component), api, meta3dEngineCoreExtensionName)
					},
					disposeGameObjectGeometryComponent: (meta3dState, gameObject, component) => {
						return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).gameObject.disposeGameObjectGeometryComponent(engineCoreState, engineCoreService, gameObject, component), api, meta3dEngineCoreExtensionName)
					},
					disposeGameObjectBasicCameraViewComponent: (meta3dState, gameObject, component) => {
						return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).gameObject.disposeGameObjectBasicCameraViewComponent(engineCoreState, engineCoreService, gameObject, component), api, meta3dEngineCoreExtensionName)
					},
					disposeGameObjectPerspectiveCameraProjectionComponent: (meta3dState, gameObject, component) => {
						return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).gameObject.disposeGameObjectPerspectiveCameraProjectionComponent(engineCoreState, engineCoreService, gameObject, component), api, meta3dEngineCoreExtensionName)
					},
				},
				transform: {
					createTransform: (meta3dState) => {
						return _encapsulateSceneAPIReturnStateAndData(meta3dState, api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).transform.createTransform, api, meta3dEngineCoreExtensionName)
					},
					getLocalPosition: (meta3dState, transform) => {
						return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).transform.getLocalPosition(engineCoreState, engineCoreService, transform), api, meta3dEngineCoreExtensionName)
					},
					setLocalPosition: (meta3dState, transform, localPosition) => {
						return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).transform.setLocalPosition(engineCoreState, engineCoreService, transform, localPosition), api, meta3dEngineCoreExtensionName)
					},
					lookAt: (meta3dState, transform, target) => {
						return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).transform.lookAt(engineCoreState, engineCoreService, transform, target), api, meta3dEngineCoreExtensionName)
					},
				},
				basicCameraView: {
					createBasicCameraView: (meta3dState) => {
						return _encapsulateSceneAPIReturnStateAndData(meta3dState, api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).basicCameraView.createBasicCameraView, api, meta3dEngineCoreExtensionName)
					},
					active: (meta3dState, basicCameraView) => {
						return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).basicCameraView.active(engineCoreState, engineCoreService, basicCameraView), api, meta3dEngineCoreExtensionName)
					},
				},
				geometry: {
					createGeometry: (meta3dState) => {
						return _encapsulateSceneAPIReturnStateAndData(meta3dState, api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).geometry.createGeometry, api, meta3dEngineCoreExtensionName)
					},
					setVertices: (meta3dState, geometry, vertices) => {
						return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).geometry.setVertices(engineCoreState, engineCoreService, geometry, vertices), api, meta3dEngineCoreExtensionName)
					},
					setIndices: (meta3dState, geometry, indices) => {
						return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).geometry.setIndices(engineCoreState, engineCoreService, geometry, indices), api, meta3dEngineCoreExtensionName)
					},
				},
				pbrMaterial: {
					createPBRMaterial: (meta3dState) => {
						return _encapsulateSceneAPIReturnStateAndData(meta3dState, api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).pbrMaterial.createPBRMaterial, api, meta3dEngineCoreExtensionName)
					},
					setDiffuseColor: (meta3dState, pbrMaterial, diffuseColor) => {
						return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).pbrMaterial.setDiffuseColor(engineCoreState, engineCoreService, pbrMaterial, diffuseColor), api, meta3dEngineCoreExtensionName)
					},
					getAllPBRMaterials: (meta3dState) => {
						return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).pbrMaterial.getAllPBRMaterials(engineCoreState, engineCoreService), api, meta3dEngineCoreExtensionName)
					},
				},
				perspectiveCameraProjection: {
					createPerspectiveCameraProjection: (meta3dState) => {
						return _encapsulateSceneAPIReturnStateAndData(meta3dState, api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).perspectiveCameraProjection.createPerspectiveCameraProjection, api, meta3dEngineCoreExtensionName)
					},
					setFovy: (meta3dState, perspectiveCameraProjection, fovy) => {
						return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).perspectiveCameraProjection.setFovy(engineCoreState, engineCoreService, perspectiveCameraProjection, fovy), api, meta3dEngineCoreExtensionName)
					},
					setNear: (meta3dState, perspectiveCameraProjection, near) => {
						return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).perspectiveCameraProjection.setNear(engineCoreState, engineCoreService, perspectiveCameraProjection, near), api, meta3dEngineCoreExtensionName)
					},
					setFar: (meta3dState, perspectiveCameraProjection, far) => {
						return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).perspectiveCameraProjection.setFar(engineCoreState, engineCoreService, perspectiveCameraProjection, far), api, meta3dEngineCoreExtensionName)
					},
					setAspect: (meta3dState, perspectiveCameraProjection, aspect) => {
						return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						).perspectiveCameraProjection.setAspect(engineCoreState, engineCoreService, perspectiveCameraProjection, aspect), api, meta3dEngineCoreExtensionName)
					},
				}
			}
		}
	}

export let createExtensionState: createExtensionStateMeta3D<
	state
> = () => {
	return null
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
	return {
	}
}
