import { execFunc as execFuncType } from "../../Type";
import { getState } from "../../Utils";
import { states } from "engine-work-plugin-webgl1-worker-main-protocol";
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, worker } = getState(states)

	return mostService.callFunc(() => {
		console.log("send begin loop data job webgl worker exec on main thread")

		getExn(worker).postMessage({
			operateType: "SEND_BEGIN_LOOP"
		})

		return engineCoreState
	})
}