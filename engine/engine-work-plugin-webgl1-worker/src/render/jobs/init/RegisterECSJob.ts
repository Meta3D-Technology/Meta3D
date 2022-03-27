import { execFunc as execFuncType } from "../../Type"
import { getState } from "../../Utils"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { states } from "engine-work-plugin-webgl1-worker-render-protocol"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, engineCoreService, registerECSService, transformBuffer, geometryBuffer, pbrMaterialBuffer, isDebug } = getState(states)

	return mostService.callFunc(() => {
		console.log("register ecs exec on worker thread");

		// TODO get buffer count from main
		engineCoreState = registerECSService.register(engineCoreState, engineCoreService, {
			isDebug,
			transformCount: 10,
			geometryCount: 10,
			geometryPointCount: 100,
			pbrMaterialCount: 10,
			transformBuffer: getExn(transformBuffer),
			geometryBuffer: getExn(geometryBuffer),
			pbrMateiralBuffer: getExn(pbrMaterialBuffer),

		})

		return engineCoreState
	})
}