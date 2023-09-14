import { execFunc as execFuncType } from "meta3d-engine-core-gameview-protocol/src/contribute/work/PipelineContributeType"
import { getState } from "../Utils"
import { states } from "meta3d-pipeline-editor-event-gameview-protocol/src/StateType"
import { initEvent } from "meta3d-pipeline-editor-event-sceneview-utils/src/InitEventJobUtils"

export let execFunc: execFuncType = (meta3dState, { getStatesFunc }) => {
	let states = getStatesFunc<states>(meta3dState)
	let { mostService, eventService } = getState(states)

	return mostService.callFunc(() => {
		console.log("init event job")

		return initEvent(meta3dState, eventService)
	})
}