import { execFunc as execFuncType } from "meta3d-engine-core-sceneview-protocol/src/contribute/work/PipelineContributeType"
import { getState } from "../Utils"
import { states } from "meta3d-pipeline-webgl1-three-sceneview-protocol/src/StateType"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(meta3dState)
	let { mostService, converterService } = getState(states)

	return mostService.callFunc(() => {
		// console.log("convertSceneGraph job")

		return api.setExtensionState(meta3dState,
			"meta3d-scenegraph-converter-three-sceneview-protocol",
			converterService.convert(meta3dState)
		)
	})
}