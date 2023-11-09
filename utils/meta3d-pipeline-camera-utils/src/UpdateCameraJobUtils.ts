import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { componentName, perspectiveCameraProjection, dataName, dirty } from "meta3d-component-perspectivecameraprojection-protocol";
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";
import { updatePerspectiveCameraProjection } from "meta3d-component-commonlib"
import { arcballCameraController, componentName as arcballCameraControllerComponentName, dataName as arcballCameraControllerDataName, distance, phi, target, theta } from "meta3d-component-arcballcameracontroller-protocol";
import { transform, componentName as transformComponentName, dataName as transformDataName } from "meta3d-component-transform-protocol";
import { lookAt } from "meta3d-component-commonlib"

let _updateAllDirtyPerspectiveCameraProjections = <engineCoreState_ extends engineCoreState>(
	engineCoreState: engineCoreState, engineCoreService: engineCoreService, isDebug: boolean, canvasSize: [number, number]
): engineCoreState_ => {
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

	return engineCoreService.setUsedComponentContribute(engineCoreState, usedPerspectiveCameraProjectionContribute, componentName) as engineCoreState_
}

let _updateAllDirtyArcballCameraControllers = (
	engineCoreState: engineCoreState,
	engineCoreService: engineCoreService,
): engineCoreState => {
	let { getComponentGameObjects, getComponent, unsafeGetUsedComponentContribute, getComponentData, setComponentData, getAllComponents, setUsedComponentContribute } = engineCoreService

	let contribute = unsafeGetUsedComponentContribute(engineCoreState, arcballCameraControllerComponentName)

	engineCoreState =
		getAllComponents<arcballCameraController>(contribute).filter(arcballCameraController => {
			return getComponentData<arcballCameraController, dirty>(contribute, arcballCameraController, dataName.dirty)
		}).reduce((engineCoreState, arcballCameraController) => {
			contribute = unsafeGetUsedComponentContribute(engineCoreState, arcballCameraControllerComponentName)

			let distance = getExn(getComponentData<arcballCameraController, distance>(contribute, arcballCameraController, arcballCameraControllerDataName.distance))
			let phi = getExn(getComponentData<arcballCameraController, phi>(contribute, arcballCameraController, arcballCameraControllerDataName.phi))
			let theta = getExn(getComponentData<arcballCameraController, theta>(contribute, arcballCameraController, arcballCameraControllerDataName.theta))
			let target = getExn(getComponentData<arcballCameraController, target>(contribute, arcballCameraController, arcballCameraControllerDataName.target))
			let transform = getExn(
				getExn(getComponent<transform>(unsafeGetUsedComponentContribute(engineCoreState, transformComponentName), getExn(getComponentGameObjects<arcballCameraController>(contribute, arcballCameraController)[0])))
			)

			engineCoreState = setUsedComponentContribute(engineCoreState, contribute, arcballCameraControllerComponentName)


			let x = distance * Math.sin(theta) * Math.sin(phi);
			let y = distance * Math.cos(theta);
			let z = distance * Math.sin(theta) * Math.cos(phi);

			contribute = unsafeGetUsedComponentContribute(engineCoreState, transformComponentName)

			contribute = setComponentData(contribute, transform, transformDataName.localPosition, [
				x, y, z
			])

			contribute = lookAt(contribute, engineCoreService, transform, target)

			engineCoreState = setUsedComponentContribute(engineCoreState, contribute, transformComponentName)

			return engineCoreState
		}, engineCoreState)

	contribute = unsafeGetUsedComponentContribute(engineCoreState, arcballCameraControllerComponentName)

	contribute = getAllComponents<arcballCameraController>(contribute).reduce((contribute, arcballCameraController) => {
		return setComponentData(contribute, arcballCameraController, arcballCameraControllerDataName.dirty, false)
	}, contribute)

	return setUsedComponentContribute(engineCoreState, contribute, arcballCameraControllerComponentName)
}

export function updateCamera<engineCoreState_ extends engineCoreState, engineCoreService_ extends engineCoreService>(engineCoreState: engineCoreState_, engineCoreService: engineCoreService_,
	isDebug: boolean, canvasSize: [number, number]) {
	engineCoreState = _updateAllDirtyPerspectiveCameraProjections(
		engineCoreState, engineCoreService, isDebug, canvasSize
	)

	return _updateAllDirtyArcballCameraControllers(
		engineCoreState,
		engineCoreService,
	)
}