import { execFunc as execFuncType } from "meta3d-engine-core-sceneview-protocol/src/contribute/work/PipelineContributeType"
import { getState } from "../Utils"
import { states } from "meta3d-pipeline-camera-sceneview-protocol/src/StateType"
import { updateCamera } from "meta3d-pipeline-camera-sceneview-utils/src/UpdateCameraJobUtils"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { pipelineName as viewRectPipelineName } from "meta3d-pipeline-viewrect-sceneview-protocol/src/StateType"
import { state as engineCoreState } from "meta3d-engine-core-sceneview-protocol/src/state/StateType"
import { service as engineCoreService } from "meta3d-engine-core-sceneview-protocol/src/service/ServiceType"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc, meta3dEngineCoreExtensionProtocolName }) => {
	let states = getStatesFunc<states>(meta3dState)
	let { mostService, engineCoreService, isDebug } = getState(states)

	return mostService.callFunc(() => {
		console.log("update camera job")

		let { width, height } = getExn(states[viewRectPipelineName].viewRect)

		return api.setExtensionState(meta3dState, meta3dEngineCoreExtensionProtocolName, updateCamera<engineCoreState, engineCoreService>(api.getExtensionState(meta3dState, meta3dEngineCoreExtensionProtocolName), engineCoreService, isDebug, [width, height]))
	})
}