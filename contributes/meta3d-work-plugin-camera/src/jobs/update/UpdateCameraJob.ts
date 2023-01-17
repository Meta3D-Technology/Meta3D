import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/WorkPluginContributeType"
import { getState } from "../Utils"
import { states } from "meta3d-work-plugin-camera-protocol/src/StateType"
import { updateCamera } from "../UpdateCameraUtils"
import { getViewRect } from "meta3d-view-utils/src/ViewRect"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc, meta3dEngineCoreExtensionProtocolName }) => {
	let states = getStatesFunc<states>(meta3dState)
	// let { mostService, engineCoreService, isDebug, workPluginWhichHasCanvasName } = getState(states)
	let { mostService, engineCoreService, isDebug, meta3dUIExtensionProtocolName } = getState(states)

	return mostService.callFunc(() => {
		console.log("update camera job")

		// let canvas = getCanvas(states, workPluginWhichHasCanvasName)

		let { width, height } = getExn(getViewRect(api.getExtensionService(meta3dState, meta3dUIExtensionProtocolName), api.getExtensionState(meta3dState, meta3dUIExtensionProtocolName)))

		return api.setExtensionState(meta3dState, meta3dEngineCoreExtensionProtocolName, updateCamera(api.getExtensionState(meta3dState, meta3dEngineCoreExtensionProtocolName), engineCoreService, isDebug, [width, height]))
	})
}