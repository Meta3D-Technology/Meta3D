import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { execFunc as execFuncType } from "../../Type"
import { getState } from "../../Utils"
import { states } from "engine-work-plugin-webgl1-worker-main-protocol"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, webgl1WorkerSyncService, worker } = getState(states)

	return mostService.map(() => {
		console.log("get finish render data job webgl worker exec on main thread");

		return engineCoreState
	}, webgl1WorkerSyncService.getFinishRenderData(mostService, getExn(worker))
	)
}
