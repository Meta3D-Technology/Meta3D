import { execFunc as execFuncType } from "meta3d-engine-core-sceneview-protocol/src/contribute/work/PipelineContributeType"
import { getGL, getState } from "../Utils";
import { states } from "meta3d-pipeline-webgl1-detectgl-protocol/src/StateType";

export let execFunc: execFuncType = (meta3dState, { getStatesFunc }) => {
	let states = getStatesFunc<states>(meta3dState)
	let { mostService, webgl1Service } = getState(states)

	return mostService.callFunc(() => {
		console.log("detect gl job");

		webgl1Service.getExtension("OES_element_index_uint", getGL(states))

		return meta3dState
	})
}