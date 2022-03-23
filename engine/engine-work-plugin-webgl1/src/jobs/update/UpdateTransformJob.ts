import { execFunc as execFuncType } from "../../Type";
import { getState } from "../Utils";
import { exec as updateTransform } from "engine-work-plugin-webgl1-utils/src/utils/UpdateTransformUtils";
import { states } from "engine-work-plugin-webgl1-protocol";

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, engineCoreService } = getState(states)

	return mostService.callFunc(() => {
		console.log("update webgl job update transform job exec");

		return updateTransform(engineCoreState, engineCoreService);
	})
}