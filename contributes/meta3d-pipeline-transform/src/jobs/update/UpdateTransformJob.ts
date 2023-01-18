import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { getState } from "../Utils"
import { states } from "meta3d-pipeline-transform-protocol/src/StateType"
import { updateTransform } from "../UpdateTransformUtils"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc, meta3dEngineCoreExtensionProtocolName }) => {
	let states = getStatesFunc<states>(meta3dState)
	let { mostService, engineCoreService } = getState(states)

	return mostService.callFunc(() => {
		console.log("update transform job")

		return api.setExtensionState(meta3dState, meta3dEngineCoreExtensionProtocolName, updateTransform(api.getExtensionState(meta3dState, meta3dEngineCoreExtensionProtocolName), engineCoreService))
	})
}