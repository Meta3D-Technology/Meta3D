import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { getState } from "../Utils"
import { states } from "meta3d-pipeline-camera-protocol/src/StateType"
import { updateCamera } from "../UpdateCameraUtils"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { pipelineName as dataPipelineName } from "meta3d-pipeline-webgl1-data-protocol/src/StateType"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc, meta3dEngineCoreExtensionProtocolName }) => {
	let states = getStatesFunc<states>(meta3dState)
	let { mostService, engineCoreService, isDebug } = getState(states)

	return mostService.callFunc(() => {
		console.log("update camera job")

		let { width, height } = getExn(states[dataPipelineName].viewRect)

		return api.setExtensionState(meta3dState, meta3dEngineCoreExtensionProtocolName, updateCamera(api.getExtensionState(meta3dState, meta3dEngineCoreExtensionProtocolName), engineCoreService, isDebug, [width, height]))
	})
}