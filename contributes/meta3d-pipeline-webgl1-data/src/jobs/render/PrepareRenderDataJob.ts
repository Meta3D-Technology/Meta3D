import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { getState, setState } from "../Utils"
import { states } from "meta3d-pipeline-webgl1-data-protocol/src/StateType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { componentName as basicCameraViewComponentName } from "meta3d-component-basiccameraview-protocol"
import { getViewWorldToCameraMatrix } from "meta3d-component-commonlib"
import { componentName as perspectiveCameraProjectionComponentName, perspectiveCameraProjection, pMatrix, dataName } from "meta3d-component-perspectivecameraprojection-protocol";
import { componentName as pbrMaterialComponentName, pbrMaterial } from "meta3d-component-pbrmaterial-protocol"
import { componentName as transformComponentName, transform } from "meta3d-component-transform-protocol"
import { componentName as geometryComponentName, geometry } from "meta3d-component-geometry-protocol"
import { gameObject } from "meta3d-gameobject-protocol"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { getActiveCameraView } from "meta3d-component-commonlib";

let _getCameraView  = (engineCoreState: engineCoreState, engineCoreService: engineCoreService, isDebug: boolean) =>  {
	return getExn(getActiveCameraView(engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, basicCameraViewComponentName), engineCoreService, isDebug))

}

let _getCameraProjection  = (engineCoreState: engineCoreState, engineCoreService: engineCoreService, gameObject: gameObject) =>  {
	return getExn(engineCoreService.getComponent<perspectiveCameraProjection>(engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, perspectiveCameraProjectionComponentName), gameObject))
}

let _getAllRenderComponents = (engineCoreService: engineCoreService, engineCoreState: engineCoreState) =>  {
	let allGameObjects = engineCoreService.getAllGameObjects(engineCoreState)
	let usedPBRMaterialContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, pbrMaterialComponentName)
	let usedTransformContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, transformComponentName)
	let usedGeometryContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, geometryComponentName)

	return allGameObjects.filter(gameObject => {
		return engineCoreService.hasComponent(usedPBRMaterialContribute, gameObject)
	}).map(gameObject => {
		return {
			transform: getExn(
				engineCoreService.getComponent<transform>(usedTransformContribute, gameObject)
			),
			material: getExn(
				engineCoreService.getComponent<pbrMaterial>(usedPBRMaterialContribute, gameObject)
			),
			geometry: getExn(
				engineCoreService.getComponent<geometry>(usedGeometryContribute, gameObject)
			)
		}

	})
}

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc, meta3dEngineCoreExtensionProtocolName }) => {
	let states = getStatesFunc<states>(meta3dState)
	let { mostService, engineCoreService, isDebug } = getState(states)

	return mostService.callFunc(() => {
		console.log("prepare render data job");

		let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, meta3dEngineCoreExtensionProtocolName)

		let usedBasicCameraViewContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, basicCameraViewComponentName)

		let cameraView = _getCameraView(engineCoreState, engineCoreService, isDebug)

		let viewMatrix = getExn(getViewWorldToCameraMatrix(
			usedBasicCameraViewContribute,
			engineCoreService,
			engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, transformComponentName),
			cameraView
		))
		let gameObject = engineCoreService.getComponentGameObjects(usedBasicCameraViewContribute, cameraView)[0]

		let cameraProjection = getExn(_getCameraProjection(engineCoreState, engineCoreService, gameObject))

		let pMatrix = getExn(engineCoreService.getComponentData<perspectiveCameraProjection, pMatrix>(engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, perspectiveCameraProjectionComponentName), cameraProjection, dataName.pMatrix))

		return setStatesFunc<states>(
			meta3dState,
			setState(states, {
				...getState(states),
				viewMatrix,
				pMatrix,
				allRenderComponents: _getAllRenderComponents(engineCoreService, engineCoreState)
			})
		)
	})
}