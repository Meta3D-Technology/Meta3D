import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { componentName, perspectiveCameraProjection, dataName, dirty } from "meta3d-component-perspectivecameraprojection-protocol";
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";
import { updatePerspectiveCameraProjection } from "meta3d-component-commonlib"

export let updateCamera = (engineCoreState: engineCoreState, engineCoreService: engineCoreService, isDebug: boolean, canvasSize: [number, number]) => {
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