import { execFunc as execFuncType } from "../../Type";
import { getState } from "../Utils";
import { states } from "engine-work-plugin-webgl1-protocol";

export let execFunc: execFuncType = (state, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(state)
	let { mostService, webgl1Service, canvas } = getState(states)

	return mostService.callFunc(() => {
		let gl = webgl1Service.getContext(canvas)

		console.log("create gl job->gl:", gl);

		return setStatesFunc<states>(
			state,
			{
				...states,
				"engine-work-plugin-webgl1": {
					...getState(states),
					gl: gl
				}
			}
		)
	})
}