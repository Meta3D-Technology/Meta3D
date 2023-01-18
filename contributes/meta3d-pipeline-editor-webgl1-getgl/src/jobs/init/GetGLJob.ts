import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { getDataState, getState, setStateToData } from "../Utils";
import { states } from "meta3d-pipeline-editor-webgl1-getgl-protocol/src/StateType";

export let execFunc: execFuncType = (meta3dState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(meta3dState)
	let { mostService, uiService } = getState(states)

	return mostService.callFunc(() => {
		let gl = uiService.getContext(meta3dState)

		console.log("editor get gl job->gl:", gl);

		return setStatesFunc<states>(
			meta3dState,
			setStateToData(states,
				{
					...getDataState(states),
					gl: gl
				}
			)
		)
	})
}