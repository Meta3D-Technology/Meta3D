import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType"
import { getState } from "../../Utils"
import { states } from "engine-work-plugin-webgl1-worker-main-protocol"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, webgl1WorkerSyncService, worker } = getState(states)

	return mostService.map(() => {
		console.log("get finish send init render data job webgl worker exec on main thread")

		return engineCoreState
	}, webgl1WorkerSyncService.getFinishInitRenderData(mostService, getExn(worker))
	)
}
