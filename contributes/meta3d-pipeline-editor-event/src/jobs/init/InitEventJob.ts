import { execFunc as execFuncType } from "meta3d-engine-core-sceneview-protocol/src/contribute/work/PipelineContributeType"
import { getState } from "../Utils"
import { states } from "meta3d-pipeline-editor-event-protocol/src/StateType"

export let execFunc: execFuncType = (meta3dState, { getStatesFunc, api }) => {
	let states = getStatesFunc<states>(meta3dState)
	let { mostService, eventService } = getState(states)

	return mostService.callFunc(() => {
		//console.log("init event job")

		meta3dState = eventService.setBody(meta3dState, "meta3d-event-protocol", document.body as HTMLBodyElement)
		meta3dState = eventService.setBrowser(meta3dState, "meta3d-event-protocol", eventService.getBrowserChromeType());
		meta3dState = eventService.setCanvas(meta3dState, "meta3d-event-protocol", document.querySelector("canvas") as HTMLCanvasElement)

		meta3dState = eventService.initEvent(meta3dState, "meta3d-event-protocol")

		return meta3dState
	})
}