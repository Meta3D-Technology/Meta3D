import { execFunc as execFuncType } from "../../Type";
import { getState } from "../Utils";
import { exec as updateCamera } from "engine-work-plugin-webgl1-utils/src/utils/UpdateCameraUtils";
import { states } from "engine-work-plugin-webgl1-protocol";


export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { isDebug, mostService, engineCoreService, canvas } = getState(states)

	return mostService.callFunc(() => {
		console.log("update webgl job update camera job exec");

		return updateCamera(engineCoreState, engineCoreService, isDebug, [canvas.width, canvas.height]);
	})
}