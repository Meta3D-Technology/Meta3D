import { execFunc as execFuncType } from "meta3d-engine-core-sceneview-protocol/src/contribute/work/PipelineContributeType"
import { getState, setState } from "../Utils"
import { states } from "your-protocol/src/StateType"

export let execFunc: execFuncType = (meta3dState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(meta3dState)
	let state = getState(states)
	let { mostService, TODO } = getState(states)

	return mostService.callFunc(() => {
		TODO

		return meta3dState
	})
}