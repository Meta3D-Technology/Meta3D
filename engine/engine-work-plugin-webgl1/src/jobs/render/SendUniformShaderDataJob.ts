import { execFunc as execFuncType } from "../../Type"
import { getGL, getState } from "../Utils"
import { states } from "engine-work-plugin-webgl1-protocol"
import { sendCameraData, getCameraView, getCameraProjection } from "engine-work-plugin-webgl1-utils/src/utils/SendCameraDataUtils"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { componentName as basicCameraViewComponentName } from "meta3d-component-basiccameraview-protocol"
import { componentName as transformComponentName } from "meta3d-component-transform-protocol"
import { getViewWorldToCameraMatrix } from "meta3d-component-commonlib"
import { componentName as perspectiveCameraProjectionComponentName, perspectiveCameraProjection, pMatrix, dataName } from "meta3d-component-perspectivecameraprojection-protocol";

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, webgl1Service, engineCoreService,  isDebug, material } = getState(states)

	return mostService.callFunc(() => {
		console.log("send uniform shader data job exec")

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

		let programMap = material.programMap

		sendCameraData(webgl1Service, getGL(states), programMap, viewMatrix, pMatrix)

		return engineCoreState
	})
}