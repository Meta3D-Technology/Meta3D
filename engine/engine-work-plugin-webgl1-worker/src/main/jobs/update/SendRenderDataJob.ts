import { execFunc as execFuncType } from "../../Type";
import { getRenderDataBufferTypeArray, getRenderGameObjectsCount, getState } from "../../Utils";
import { states } from "engine-work-plugin-webgl1-worker-main-protocol";
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, webgl1WorkerSyncService, engineCoreService, worker, isDebug } = getState(states)

	return mostService.callFunc(() => {
		console.log("send render data job webgl worker exec on main thread")

		webgl1WorkerSyncService.sendRenderData(engineCoreService, engineCoreState, isDebug, getExn(worker), {
			typeArray: getRenderDataBufferTypeArray(states),
			renderGameObjectsCount: getRenderGameObjectsCount(states)
		})

		return engineCoreState
	})
}