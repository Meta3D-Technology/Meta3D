import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { getState } from "../Utils"
import { states } from "meta3d-pipeline-camera-protocol/src/StateType"
import { updateCamera } from "meta3d-pipeline-camera-utils/src/UpdateCameraJobUtils"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { getViewRect } from "meta3d-view-utils/src/SceneViewRect";

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc, meta3dEngineCoreExtensionProtocolName }) => {
	let states = getStatesFunc<states>(meta3dState)
	let { mostService, engineCoreService, isDebug } = getState(states)

	return mostService.callFunc(() => {
		//console.log("update camera job")
		let uiService = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")
		let uiState = api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol")

		// let { width, height } = getExn(states[viewRectPipelineName].viewRect)
		let { width, height } = getExn(getViewRect(
			uiService,
			uiState
		))


		return api.setExtensionState(meta3dState, meta3dEngineCoreExtensionProtocolName, updateCamera<engineCoreState, engineCoreService>(api.getExtensionState(meta3dState, meta3dEngineCoreExtensionProtocolName), engineCoreService, isDebug, [width, height]))
	})
}