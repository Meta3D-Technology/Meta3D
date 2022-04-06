import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { getState, setState } from "../Utils"
import { states } from "engine-work-plugin-webgl1-protocol"
import { transform, componentName as transformComponentName, needDisposedComponents as needDisposedTransforms } from "meta3d-component-transform-protocol"
import { geometry, componentName as geometryComponentName, needDisposedComponents as needDisposedGeometrys } from "meta3d-component-geometry-protocol"
import { pbrMaterial, componentName as pbrMaterialComponentName, needDisposedComponents as needDisposedPBRMaterials } from "meta3d-component-pbrmaterial-protocol"
import { arcballCameraController, componentName as arcballCameraControllerComponentName, needDisposedComponents as needDisposedArcballCameraControllers } from "meta3d-component-arcballcameracontroller-protocol"
import { basicCameraView, componentName as basicCameraViewComponentName, needDisposedComponents as needDisposedBasicCameraView } from "meta3d-component-basiccameraview-protocol"
import { perspectiveCameraProjection, componentName as perspectiveCameraProjectionComponentName, needDisposedComponents as needDisposedPerspectiveCameraProjection } from "meta3d-component-perspectivecameraprojection-protocol"

function _disposeComponents(engineCoreState: engineCoreState, engineCoreService: engineCoreService) {
	let usedPBRMaterialContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, pbrMaterialComponentName)
	let usedTransformContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, transformComponentName)
	let usedGeometryContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, geometryComponentName)
	let usedArcballCameraControllerContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, arcballCameraControllerComponentName)
	let usedBasicCameraViewContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, basicCameraViewComponentName)
	let usedPerspectiveCameraProjectionContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, perspectiveCameraProjectionComponentName)

	usedPBRMaterialContribute = engineCoreService.disposeComponents<pbrMaterial, needDisposedPBRMaterials>(usedPBRMaterialContribute, engineCoreService.getNeedDisposedComponents(usedPBRMaterialContribute))
	usedTransformContribute = engineCoreService.disposeComponents<transform, needDisposedTransforms>(usedTransformContribute, engineCoreService.getNeedDisposedComponents(usedTransformContribute))
	usedGeometryContribute = engineCoreService.disposeComponents<geometry, needDisposedGeometrys>(usedGeometryContribute, engineCoreService.getNeedDisposedComponents(usedGeometryContribute))
	usedArcballCameraControllerContribute = engineCoreService.disposeComponents<arcballCameraController, needDisposedArcballCameraControllers>(usedArcballCameraControllerContribute, engineCoreService.getNeedDisposedComponents(usedArcballCameraControllerContribute))
	usedBasicCameraViewContribute = engineCoreService.disposeComponents<basicCameraView, needDisposedBasicCameraView>(usedBasicCameraViewContribute, engineCoreService.getNeedDisposedComponents(usedBasicCameraViewContribute))
	usedPerspectiveCameraProjectionContribute = engineCoreService.disposeComponents<perspectiveCameraProjection, needDisposedPerspectiveCameraProjection>(usedPerspectiveCameraProjectionContribute, engineCoreService.getNeedDisposedComponents(usedPerspectiveCameraProjectionContribute))

	// TODO use pipe
	engineCoreState = engineCoreService.setUsedComponentContribute(engineCoreState, usedTransformContribute, transformComponentName)
	engineCoreState = engineCoreService.setUsedComponentContribute(engineCoreState, usedPBRMaterialContribute, pbrMaterialComponentName)
	engineCoreState = engineCoreService.setUsedComponentContribute(engineCoreState, usedGeometryContribute, geometryComponentName)
	engineCoreState = engineCoreService.setUsedComponentContribute(engineCoreState, usedArcballCameraControllerContribute, arcballCameraControllerComponentName)
	engineCoreState = engineCoreService.setUsedComponentContribute(engineCoreState, usedBasicCameraViewContribute, basicCameraViewComponentName)
	engineCoreState = engineCoreService.setUsedComponentContribute(engineCoreState, usedPerspectiveCameraProjectionContribute, perspectiveCameraProjectionComponentName)

	return engineCoreState
}

function _disposeGameObjects(engineCoreState: engineCoreState, engineCoreService: engineCoreService) {
	return engineCoreService.disposeGameObjects(engineCoreState, engineCoreService.getNeedDisposedGameObjects(engineCoreState))
}

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, engineCoreService } = getState(states)

	return mostService.callFunc(() => {
		console.log("dispose scene job");

		// TODO use pipe
		engineCoreState = _disposeComponents(engineCoreState, engineCoreService)
		engineCoreState = _disposeGameObjects(engineCoreState, engineCoreService)

		return engineCoreState
	})
}