import { state as meta3dState } from "meta3d-type"
import { engineCoreService } from "meta3d-core-protocol/src/service/ServiceType"
import { componentName, perspectiveCameraProjection, dataName, dirty } from "meta3d-component-perspectivecameraprojection-protocol";
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";
import { updatePerspectiveCameraProjection } from "meta3d-component-commonlib"
import { arcballCameraController, componentName as arcballCameraControllerComponentName, dataName as arcballCameraControllerDataName, distance, phi, target, theta } from "meta3d-component-arcballcameracontroller-protocol";
import { transform, componentName as transformComponentName, dataName as transformDataName } from "meta3d-component-transform-protocol";
import { lookAt } from "meta3d-component-commonlib"

let _updateAllDirtyPerspectiveCameraProjections = (
	meta3dState: meta3dState, engineCoreService: engineCoreService, isDebug: boolean
): meta3dState => {
	let usedPerspectiveCameraProjectionContribute = engineCoreService.unsafeGetUsedComponentContribute(meta3dState, componentName)
	let allDirtyPerspectiveCameraProjections = engineCoreService.getAllComponents<perspectiveCameraProjection>(usedPerspectiveCameraProjectionContribute).filter(cameraProjection => {
		return getExn(engineCoreService.getComponentData<perspectiveCameraProjection, boolean>(usedPerspectiveCameraProjectionContribute, cameraProjection, dataName.dirty))
	})

	usedPerspectiveCameraProjectionContribute = allDirtyPerspectiveCameraProjections.reduce((usedPerspectiveCameraProjectionContribute, cameraProjection) => {
		usedPerspectiveCameraProjectionContribute = updatePerspectiveCameraProjection(
			usedPerspectiveCameraProjectionContribute,
			engineCoreService, isDebug, cameraProjection
		)

		return engineCoreService.setComponentData<perspectiveCameraProjection, dirty>(usedPerspectiveCameraProjectionContribute, cameraProjection, dataName.dirty, false)
	}, usedPerspectiveCameraProjectionContribute)

	return engineCoreService.setUsedComponentContribute(meta3dState, usedPerspectiveCameraProjectionContribute, componentName) as meta3dState
}

let _updateAllDirtyArcballCameraControllers = (
	meta3dState: meta3dState,
	engineCoreService: engineCoreService,
): meta3dState => {
	let { getComponentGameObjects, getComponent, unsafeGetUsedComponentContribute, getComponentData, setComponentData, getAllComponents, setUsedComponentContribute } = engineCoreService

	let contribute = unsafeGetUsedComponentContribute(meta3dState, arcballCameraControllerComponentName)

	meta3dState =
		getAllComponents<arcballCameraController>(contribute).filter(arcballCameraController => {
			return getComponentData<arcballCameraController, dirty>(contribute, arcballCameraController, dataName.dirty)
		}).reduce((meta3dState, arcballCameraController) => {
			contribute = unsafeGetUsedComponentContribute(meta3dState, arcballCameraControllerComponentName)

			let distance = getExn(getComponentData<arcballCameraController, distance>(contribute, arcballCameraController, arcballCameraControllerDataName.distance))
			let phi = getExn(getComponentData<arcballCameraController, phi>(contribute, arcballCameraController, arcballCameraControllerDataName.phi))
			let theta = getExn(getComponentData<arcballCameraController, theta>(contribute, arcballCameraController, arcballCameraControllerDataName.theta))
			let target = getExn(getComponentData<arcballCameraController, target>(contribute, arcballCameraController, arcballCameraControllerDataName.target))
			let transform = getExn(
				getExn(getComponent<transform>(unsafeGetUsedComponentContribute(meta3dState, transformComponentName), getExn(getComponentGameObjects<arcballCameraController>(contribute, arcballCameraController)[0])))
			)

			meta3dState = setUsedComponentContribute(meta3dState, contribute, arcballCameraControllerComponentName)


			let x = distance * Math.sin(theta) * Math.sin(phi);
			let y = distance * Math.cos(theta);
			let z = distance * Math.sin(theta) * Math.cos(phi);

			contribute = unsafeGetUsedComponentContribute(meta3dState, transformComponentName)

			contribute = setComponentData(contribute, transform, transformDataName.localPosition, [
				x, y, z
			])

			contribute = lookAt(contribute, engineCoreService, transform, target)

			meta3dState = setUsedComponentContribute(meta3dState, contribute, transformComponentName)

			return meta3dState
		}, meta3dState)

	contribute = unsafeGetUsedComponentContribute(meta3dState, arcballCameraControllerComponentName)

	contribute = getAllComponents<arcballCameraController>(contribute).reduce((contribute, arcballCameraController) => {
		return setComponentData(contribute, arcballCameraController, arcballCameraControllerDataName.dirty, false)
	}, contribute)

	return setUsedComponentContribute(meta3dState, contribute, arcballCameraControllerComponentName)
}

export function updateCamera(meta3dState: meta3dState, engineCoreService: engineCoreService,
	isDebug: boolean) {
	meta3dState = _updateAllDirtyPerspectiveCameraProjections(
		meta3dState, engineCoreService, isDebug
	)

	return _updateAllDirtyArcballCameraControllers(
		meta3dState,
		engineCoreService,
	)
}