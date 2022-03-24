import { execFunc as execFuncType } from "../../Type"
import { getState } from "../../Utils"
import { states } from "engine-work-plugin-webgl1-worker-render-protocol"
import { createGL } from "engine-work-plugin-webgl1-utils/src/utils/CreateGLUtils"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, webgl1Service, canvas } = getState(states)

	return mostService.callFunc(() => {
		console.log("create gl job webgl worker exec on worker thread")

		let gl = createGL(webgl1Service, canvas as any as HTMLCanvasElement)

		return setStatesFunc<states>(
			engineCoreState,
			{
				...states,
				"engine-work-plugin-webgl1-worker-render": {
					...getState(states),
					gl: gl
				}
			}
		)
	})
}