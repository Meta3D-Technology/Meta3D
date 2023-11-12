import { execFuncType } from "meta3d-core-protocol/src/service/ServiceType"
import { getState } from "../Utils"
import { states } from "meta3d-pipeline-webgl1-three-gameviewrender-protocol/src/StateType"
import { buildGetAllGameObjectsFunc } from "meta3d-pipeline-webgl1-three-utils/src/ConvertSceneGraphJobUtils"
import { service as renderService } from "meta3d-editor-gameview-render-protocol/src/service/ServiceType"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(meta3dState)
	let { mostService, converterService } = getState(states)

	return mostService.callFunc(() => {
        if (api.getExtensionService<renderService>(meta3dState, "meta3d-editor-gameview-render-protocol").isPipelineStop(meta3dState)) {
            return meta3dState
        }

		return api.setExtensionState(meta3dState,
			"meta3d-scenegraph-converter-three-protocol",
			converterService.convert(
				buildGetAllGameObjectsFunc(api),
				meta3dState)
		)
	})
}