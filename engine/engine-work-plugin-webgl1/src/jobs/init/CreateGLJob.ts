import { execFunc as execFuncType } from "../../Type";
import { getState } from "../Utils";

export let execFunc: execFuncType = (states) => {
	let { mostService, webgl1Service, canvas } = getState(states)

	return mostService.callFunc(() => {
		let gl = webgl1Service.getContext(canvas)

		console.log("create gl job->gl:", gl);

		return {
			...states,
			"meta3d-work-plugin-webgl1": {
				...getState(states),
				gl: gl
			}
		}
	})
}