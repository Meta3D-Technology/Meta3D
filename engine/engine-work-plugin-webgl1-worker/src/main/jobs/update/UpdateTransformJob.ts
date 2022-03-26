import { execFunc as execFuncType } from "../../Type"
import { getState } from "../../Utils"
import { states } from "engine-work-plugin-webgl1-worker-main-protocol"
import { exec as updateTransform } from "engine-work-plugin-webgl1-utils/src/utils/UpdateTransformUtils"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, engineCoreService } = getState(states)

	return mostService.callFunc(() => {
		console.log("update transform job webgl worker exec on main thread")
		return updateTransform(engineCoreState, engineCoreService)
	})
}