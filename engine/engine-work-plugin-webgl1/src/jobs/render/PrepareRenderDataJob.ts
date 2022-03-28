import { execFunc as execFuncType } from "../../Type"
import { getState, setState } from "../Utils"
import { states } from "engine-work-plugin-webgl1-protocol"
import { getCameraView, getCameraProjection } from "engine-work-plugin-webgl1-utils/src/utils/SendCameraDataUtils"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { componentName as basicCameraViewComponentName } from "meta3d-component-basiccameraview-protocol"
import { componentName as transformComponentName } from "meta3d-component-transform-protocol"
import { getViewWorldToCameraMatrix } from "meta3d-component-commonlib"
import { componentName as perspectiveCameraProjectionComponentName, perspectiveCameraProjection, pMatrix, dataName } from "meta3d-component-perspectivecameraprojection-protocol";

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, engineCoreService, isDebug } = getState(states)

	return mostService.callFunc(() => {
		console.log("prepare render data job");

		let usedBasicCameraViewContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, basicCameraViewComponentName)

		let cameraView = getCameraView(engineCoreState, engineCoreService, isDebug)

		let viewMatrix = getExn(getViewWorldToCameraMatrix(
			usedBasicCameraViewContribute,
			engineCoreService,
			engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, transformComponentName),
			cameraView
		))
		let gameObject = engineCoreService.getComponentGameObjects(usedBasicCameraViewContribute, cameraView)[0]

		let cameraProjection = getExn(getCameraProjection(engineCoreState, engineCoreService, gameObject))

		let pMatrix = getExn(engineCoreService.getComponentData<perspectiveCameraProjection, pMatrix>(engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, perspectiveCameraProjectionComponentName), cameraProjection, dataName.pMatrix))

		return setStatesFunc<states>(
			engineCoreState,
			setState(states, {
				...getState(states),
				viewMatrix,
				pMatrix
			})
		)
	})
}