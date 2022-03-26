import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { createGetOtherWorkerDataStream } from "meta3d-commonlib-ts/src/CreateWorkerDataStreamService"
import { execFunc as execFuncType } from "../../Type"
import { getState } from "../../Utils"
import { states } from "engine-work-plugin-webgl1-worker-main-protocol"

let _getStride = () => 3 * 4

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, worker } = getState(states)

	worker = getExn(worker)

	//// TODO need to get the new states
	return createGetOtherWorkerDataStream(mostService, "FINISH_SEND_INIT_RENDER_DATA", worker).map(() => {
		console.log("get finish send init render data job webgl worker exec on main thread")

		return engineCoreState
	})
}
