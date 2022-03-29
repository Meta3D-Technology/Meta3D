import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType";
import { getState } from "../../Utils";
import { states } from "engine-work-plugin-webgl1-worker-main-protocol";
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, webgl1WorkerSyncService, worker } = getState(states)

	return mostService.callFunc(() => {
		console.log("send begin loop data job webgl worker exec on main thread")

		webgl1WorkerSyncService.sendBeginLoopData(getExn(worker))

		return engineCoreState
	})
}