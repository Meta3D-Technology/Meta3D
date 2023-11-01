import { execFunc as execFuncType } from "meta3d-engine-core-gameview-protocol/src/contribute/work/PipelineContributeType"
import { getState } from "../Utils"
import { states } from "meta3d-pipeline-webgl1-three-gameview-protocol/src/StateType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { setSizeAndViewport } from "meta3d-pipeline-webgl1-three-utils/src/SetSizeAndViewportJobUtils"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { getViewRect } from "meta3d-view-utils/src/GameViewRect";

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(meta3dState)
	let { mostService, renderer, canvas } = getState(states)

	return mostService.callFunc(() => {
		renderer = getExn(renderer)

		let uiService = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")
		let uiState = api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol")

		setSizeAndViewport(renderer, getExn(getViewRect(
			uiService,
			uiState
		)), canvas)

		return meta3dState
	})
}