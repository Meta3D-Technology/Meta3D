import { execFunc as execFuncType } from "../../Type";
import { getState } from "../../Utils";
import { states } from "engine-work-plugin-webgl1-worker-main-protocol";
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { componentName as basicCameraViewComponentName, basicCameraView } from "meta3d-component-basiccameraview-protocol"
import { componentName as perspectiveCameraProjectionComponentName, perspectiveCameraProjection, dataName as perspectiveCameraProjectionDataName, pMatrix } from "meta3d-component-perspectivecameraprojection-protocol"
import { componentName as transformComponentName } from "meta3d-component-transform-worker-protocol"
import { getActiveCameraView, getViewWorldToCameraMatrix } from "meta3d-component-commonlib"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, engineCoreService, typeArray, renderGameObjectsCount, worker, isDebug } = getState(states)

	return mostService.callFunc(() => {
		console.log("send render data job webgl worker exec on main thread")

		let usedTransformContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, transformComponentName)
		let usedBasicCameraViewContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, basicCameraViewComponentName)
		let usedPerspectiveCameraProjectionContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, perspectiveCameraProjectionComponentName)

		let cameraView = getExn(
			getActiveCameraView(usedBasicCameraViewContribute, engineCoreService, isDebug)
		)

		let viewMatrix = getViewWorldToCameraMatrix(usedBasicCameraViewContribute, engineCoreService, usedTransformContribute, cameraView)
		let gameObject = engineCoreService.getComponentGameObjects(usedBasicCameraViewContribute, cameraView)[0]

		let cameraProjection = getExn(
			engineCoreService.getComponent<perspectiveCameraProjection>(usedPerspectiveCameraProjectionContribute, gameObject)
		)

		let pMatrix = getExn(engineCoreService.getComponentData<perspectiveCameraProjection, pMatrix>(usedPerspectiveCameraProjectionContribute, cameraProjection, perspectiveCameraProjectionDataName.pMatrix))

		getExn(worker).postMessage({
			operateType: "SEND_RENDER_DATA",
			camera: {
				viewMatrix,
				pMatrix
			},
			renderDataBuffer: {
				typeArray: getExn(typeArray),
				renderGameObjectCount: getExn(renderGameObjectsCount)
			}
		})

		return engineCoreState
	})
}