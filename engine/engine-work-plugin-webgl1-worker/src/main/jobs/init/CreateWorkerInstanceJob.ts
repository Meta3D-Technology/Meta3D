import { createWorker } from "../../services/WorkerService";
import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType";
import { getState } from "../../Utils";
import { states } from "engine-work-plugin-webgl1-worker-main-protocol";

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService } = getState(states)

	return mostService.callFunc(() => {
		console.log("create worker instance job webgl worker exec on main thread");

		let worker = createWorker();

		return setStatesFunc<states>(
			engineCoreState,
			{
				...states,
				"engine-work-plugin-webgl1-worker-main": {
					...getState(states),
					worker: worker
				}
			}
		)
	})
}