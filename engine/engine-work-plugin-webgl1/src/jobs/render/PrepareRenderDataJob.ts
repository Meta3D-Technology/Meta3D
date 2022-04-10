import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType"
import { getState, setState } from "../Utils"
import { states } from "engine-work-plugin-webgl1-protocol"
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

function _getCameraView (engineCoreState: engineCoreState, engineCoreService: engineCoreService, isDebug: boolean) {
	return getExn(getActiveCameraView(engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, basicCameraViewComponentName), engineCoreService, isDebug))

}

function _getCameraProjection (engineCoreState: engineCoreState, engineCoreService: engineCoreService, gameObject: gameObject) {
	return getExn(engineCoreService.getComponent<perspectiveCameraProjection>(engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, perspectiveCameraProjectionComponentName), gameObject))
}

function _getAllRenderComponents(engineCoreService: engineCoreService, engineCoreState: engineCoreState) {
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

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, engineCoreService, isDebug } = getState(states)

	return mostService.callFunc(() => {
		console.log("prepare render data job");

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

		console.log(_getAllRenderComponents(engineCoreService, engineCoreState))

		return setStatesFunc<states>(
			engineCoreState,
			setState(states, {
				...getState(states),
				viewMatrix,
				pMatrix,
				allRenderComponents: _getAllRenderComponents(engineCoreService, engineCoreState)
			})
		)
	})
}