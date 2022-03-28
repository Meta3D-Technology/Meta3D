import { execFunc as execFuncType } from "../../Type"
import { getGL, getState } from "../../Utils"
import { states } from "engine-work-plugin-webgl1-worker-render-protocol"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, webgl1Service } = getState(states)

	return mostService.callFunc(() => {
		console.log("detect gl job webgl worker exec on worker thread");

		webgl1Service.getExtension(getGL(states), "OES_element_index_uint")

		return engineCoreState
	})
}