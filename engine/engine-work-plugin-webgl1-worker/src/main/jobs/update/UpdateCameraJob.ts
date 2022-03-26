import { execFunc as execFuncType } from "../../Type"
import { getState } from "../../Utils"
import { states } from "engine-work-plugin-webgl1-worker-main-protocol"
import { exec as updateCamera } from "engine-work-plugin-webgl1-utils/src/utils/UpdateCameraUtils"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { isDebug, mostService, engineCoreService, canvas } = getState(states)

	return mostService.callFunc(() => {
		console.log("update camera job webgl worker exec on main thread")
		return updateCamera(engineCoreState, engineCoreService, isDebug, [canvas.width, canvas.height])
	})
}