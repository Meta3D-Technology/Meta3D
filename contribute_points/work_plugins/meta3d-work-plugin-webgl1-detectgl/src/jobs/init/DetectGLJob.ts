import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType"
import { getGL, getState } from "../Utils"
import { states } from "meta3d-work-plugin-webgl1-detectgl-protocol"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, webgl1Service } = getState(states)

	return mostService.callFunc(() => {
		console.log("detect gl job");

		webgl1Service.getExtension(getGL(states), "OES_element_index_uint")

		return engineCoreState
	})
}