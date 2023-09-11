import { execFunc as execFuncType } from "meta3d-engine-core-gameview-protocol/src/contribute/work/PipelineContributeType"
import { getState } from "../Utils"
import { states } from "meta3d-pipeline-transform-gameview-protocol/src/StateType"
import { updateTransform } from "meta3d-pipeline-transform-utils/src/UpdateTransformJobUtils"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc, meta3dEngineCoreExtensionProtocolName }) => {
	let states = getStatesFunc<states>(meta3dState)
	let { mostService, engineCoreService } = getState(states)

	return mostService.callFunc(() => {
		console.log("update transform job")

		return api.setExtensionState(meta3dState, meta3dEngineCoreExtensionProtocolName, updateTransform(api.getExtensionState(meta3dState, meta3dEngineCoreExtensionProtocolName), engineCoreService))
	})
}