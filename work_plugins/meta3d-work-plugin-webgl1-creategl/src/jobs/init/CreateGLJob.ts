import { execFunc as execFuncType } from "../../Type";
import { getCanvas, getState, setState } from "../Utils";
import { states } from "meta3d-work-plugin-webgl1-creategl-protocol";
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"

function _createGL({ getContext }: webgl1Service, canvas: HTMLCanvasElement) {
	return getContext(canvas)
}

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, webgl1Service, workPluginWhichHasCanvasName } = getState(states)

	return mostService.callFunc(() => {
		let gl = _createGL(webgl1Service, getCanvas(states, workPluginWhichHasCanvasName))

		console.log("create gl job->gl:", gl);

		return setStatesFunc<states>(
			engineCoreState,
			setState(states,
				{
					...getState(states),
					gl: gl
				}
			)
		)
	})
}