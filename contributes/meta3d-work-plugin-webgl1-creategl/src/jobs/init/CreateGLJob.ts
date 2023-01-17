import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/WorkPluginContributeType"
import { getState, setState } from "../Utils";
import { states } from "meta3d-work-plugin-webgl1-creategl-protocol/src/StateType";
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"

function _createGL({ getContext }: webgl1Service, canvas: HTMLCanvasElement) {
	return getContext(canvas, {
		alpha: true,
		antialias: true,
		depth: true,
		failIfMajorPerformanceCaveat: false,
		powerPreference: "default",
		premultipliedAlpha: true,
		preserveDrawingBuffer: false,
		stencil: false,
		desynchronized: false
	})
}

export let execFunc: execFuncType = (meta3dState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(meta3dState)
	let { mostService, webgl1Service, canvas, gl } = getState(states)

	return mostService.callFunc(() => {
		if (!isNullable(gl)) {
			return meta3dState
		}

		let gl_ = _createGL(webgl1Service, getExn(canvas))

		console.log("create gl job->gl:", gl_);

		return setStatesFunc<states>(
			meta3dState,
			setState(states,
				{
					...getState(states),
					gl: gl_
				}
			)
		)
	})
}