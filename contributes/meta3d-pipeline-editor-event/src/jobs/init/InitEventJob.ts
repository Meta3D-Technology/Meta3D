import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { getState } from "../Utils"
import { states } from "meta3d-pipeline-editor-event-protocol/src/StateType"

export let execFunc: execFuncType = (meta3dState, { getStatesFunc }) => {
	let states = getStatesFunc<states>(meta3dState)
	let { mostService, eventService, meta3dEventExtensionProtocolName } = getState(states)

	return mostService.callFunc(() => {
		console.log("init event job")

		return eventService.initEvent(meta3dState, meta3dEventExtensionProtocolName)
	})
}