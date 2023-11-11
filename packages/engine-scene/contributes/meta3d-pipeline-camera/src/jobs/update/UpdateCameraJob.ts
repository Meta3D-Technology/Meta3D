import { execFuncType } from "meta3d-core-protocol/src/service/ServiceType"
import { getState } from "../Utils"
import { states } from "meta3d-pipeline-camera-protocol/src/StateType"
import { updateCamera } from "meta3d-pipeline-camera-utils/src/UpdateCameraJobUtils"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc, meta3dEngineCoreExtensionProtocolName }) => {
	let states = getStatesFunc<states>(meta3dState)
	let { mostService, engineCoreService, isDebug } = getState(states)

	return mostService.callFunc(() => {
		return updateCamera(api.getExtensionState(meta3dState, meta3dEngineCoreExtensionProtocolName), engineCoreService, isDebug)
	})
}