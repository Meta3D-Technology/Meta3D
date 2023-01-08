import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/WorkPluginContributeType"
import { getState } from "../Utils"
import { states } from "meta3d-work-plugin-camera-protocol/src/StateType"
import { updateCamera } from "../UpdateCameraUtils"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	// let { mostService, engineCoreService, isDebug, workPluginWhichHasCanvasName } = getState(states)
	let { mostService, engineCoreService, isDebug, canvasSize } = getState(states)

	return mostService.callFunc(() => {
		console.log("update camera job")

		// let canvas = getCanvas(states, workPluginWhichHasCanvasName)

		return updateCamera(engineCoreState, engineCoreService, isDebug, canvasSize)
	})
}