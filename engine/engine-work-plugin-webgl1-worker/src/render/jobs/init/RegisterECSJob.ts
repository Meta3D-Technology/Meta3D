import { execFunc as execFuncType } from "../../Type"
import { getState } from "../../Utils"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { states } from "engine-work-plugin-webgl1-worker-render-protocol"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, engineCoreService, registerECSService, transformBuffer, geometryBuffer, pbrMaterialBuffer, isDebug,
		transformCount,
		geometryCount,
		geometryPointCount,
		pbrMaterialCount
	} = getState(states)

	return mostService.callFunc(() => {
		console.log("register ecs exec on worker thread");

		engineCoreState = registerECSService.register(engineCoreState, engineCoreService, {
			isDebug,
			transformCount: getExn(transformCount),
			geometryCount: getExn(geometryCount),
			geometryPointCount: getExn(geometryPointCount),
			pbrMaterialCount: getExn(pbrMaterialCount),
			transformBuffer: getExn(transformBuffer),
			geometryBuffer: getExn(geometryBuffer),
			pbrMateiralBuffer: getExn(pbrMaterialBuffer),

		})

		return engineCoreState
	})
}