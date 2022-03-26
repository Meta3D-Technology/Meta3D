import { execFunc as execFuncType } from "../../Type";
import { getState } from "../../Utils";
import { states } from "engine-work-plugin-webgl1-worker-main-protocol";

let _getStride = () => 3 * 4;

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, maxRenderGameObjectCount } = getState(states)

	return mostService.callFunc(() => {
		console.log("create render data buffer job webgl worker exec on main thread")

		let buffer = new SharedArrayBuffer(
			maxRenderGameObjectCount * _getStride()
		);

		let uint32Array = new Uint32Array(buffer);

		return setStatesFunc<states>(
			engineCoreState,
			{
				...states,
				"engine-work-plugin-webgl1-worker-main": {
					...getState(states),
					typeArray: uint32Array
				}
			}
		)
	})
}