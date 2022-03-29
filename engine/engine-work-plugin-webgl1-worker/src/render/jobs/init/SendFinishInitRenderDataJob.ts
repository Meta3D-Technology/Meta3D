import { execFunc as execFuncType } from "../../Type"
import { getState } from "../../Utils"
import { states } from "engine-work-plugin-webgl1-worker-render-protocol"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, webgl1WorkerSyncService } = getState(states)

	return mostService.callFunc(() => {
		console.log("send finish init render data job webgl worker exec on worker thread")

		webgl1WorkerSyncService.sendFinishInitRenderData()

		return engineCoreState
	})
}

