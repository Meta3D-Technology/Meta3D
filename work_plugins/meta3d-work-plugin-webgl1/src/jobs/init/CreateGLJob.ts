import { elementFunc } from "../../Type";
import { getState } from "../Utils";

export let exec: elementFunc = (states) => {
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