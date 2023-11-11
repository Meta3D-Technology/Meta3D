import { execFuncType } from "meta3d-core-protocol/src/service/ServiceType"
import { getState } from "../Utils"
import { states } from "meta3d-pipeline-transform-protocol/src/StateType"
import { updateTransform } from "meta3d-pipeline-transform-utils/src/UpdateTransformJobUtils"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(meta3dState)
	let { mostService, engineCoreService } = getState(states)

	return mostService.callFunc(() => {
		return updateTransform(meta3dState, engineCoreService)
	})
}