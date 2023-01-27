// import { state as meta3dState } from "meta3d-type"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { componentName, perspectiveCameraProjection, dataName, dirty } from "meta3d-component-perspectivecameraprojection-protocol";
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";
import { updatePerspectiveCameraProjection } from "meta3d-component-commonlib"
import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"

let _updateAllDirtyPerspectiveCameraProjections = (
	engineCoreState: engineCoreState, engineCoreService: engineCoreService, isDebug: boolean, canvasSize: [number, number]
) => {
	let usedPerspectiveCameraProjectionContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, componentName)
	let allDirtyPerspectiveCameraProjections = engineCoreService.getAllComponents<perspectiveCameraProjection>(usedPerspectiveCameraProjectionContribute).filter(cameraProjection => {
		return getExn(engineCoreService.getComponentData<perspectiveCameraProjection, boolean>(usedPerspectiveCameraProjectionContribute, cameraProjection, dataName.dirty))
	})

	usedPerspectiveCameraProjectionContribute = allDirtyPerspectiveCameraProjections.reduce((usedPerspectiveCameraProjectionContribute, cameraProjection) => {
		// TODO use pipe

		usedPerspectiveCameraProjectionContribute = updatePerspectiveCameraProjection(
			usedPerspectiveCameraProjectionContribute,
			engineCoreService, isDebug, cameraProjection, canvasSize
		)

		return engineCoreService.setComponentData<perspectiveCameraProjection, dirty>(usedPerspectiveCameraProjectionContribute, cameraProjection, dataName.dirty, false)
	}, usedPerspectiveCameraProjectionContribute)

	return engineCoreService.setUsedComponentContribute(engineCoreState, usedPerspectiveCameraProjectionContribute, componentName)
}

let _updateAllDirtyArcballCameraControllers = (
	engineCoreState: engineCoreState,
	engineCoreService: engineCoreService,
	engineSceneService: engineSceneService,
): engineCoreState => {
	let { getAllDirtyArcballCameraControllers, clearDirtyList, getDistance, getPhi, getTheta, getTarget, getGameObjects } = engineSceneService.arcballCameraController
	let { getTransform } = engineSceneService.gameObject
	let { setLocalPosition, lookAt } = engineSceneService.transform

	engineCoreState =
		getAllDirtyArcballCameraControllers(engineCoreState, engineCoreService).reduce((engineCoreState, cameraController) => {
			let distance = getExn(getDistance(engineCoreState, engineCoreService, cameraController))
			let phi = getExn(getPhi(engineCoreState, engineCoreService, cameraController))
			let theta = getExn(getTheta(engineCoreState, engineCoreService, cameraController))
			let target = getExn(getTarget(engineCoreState, engineCoreService, cameraController))
			let transform = getExn(getTransform(
				engineCoreState, engineCoreService,
				getExn(getGameObjects(engineCoreState, engineCoreService, cameraController)[0])))

			let x = distance * Math.sin(theta) * Math.sin(phi);
			let y = distance * Math.cos(theta);
			let z = distance * Math.sin(theta) * Math.cos(phi);

			engineCoreState =
				setLocalPosition(
					engineCoreState, engineCoreService,
					transform, [
					x, y, z
				])

			engineCoreState =
				lookAt(
					engineCoreState, engineCoreService,
					transform, target)

			return engineCoreState
		}, engineCoreState)

	return clearDirtyList(engineCoreState, engineCoreService)
}

export function updateCamera(engineCoreState: engineCoreState, engineCoreService: engineCoreService,
	engineSceneService: engineSceneService,
	isDebug: boolean, canvasSize: [number, number]) {
	engineCoreState = _updateAllDirtyPerspectiveCameraProjections(
		engineCoreState, engineCoreService, isDebug, canvasSize
	)

	return _updateAllDirtyArcballCameraControllers(
		engineCoreState,
		engineCoreService,
		engineSceneService,
	)
}