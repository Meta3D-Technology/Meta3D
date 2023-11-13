import { execFuncType } from "meta3d-core-protocol/src/service/ServiceType"
import { getState } from "../Utils"
import { states } from "meta3d-pipeline-webgl1-three-webrender-protocol/src/StateType"
import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { service as renderService } from "meta3d-engine-web-render-protocol/src/service/ServiceType"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(meta3dState)
	let { mostService, converterService } = getState(states)

	return mostService.callFunc(() => {
		return converterService.convert(
			getExn(
				api.getPackageService<engineSceneService>(meta3dState, "meta3d-engine-scene-protocol")
			).gameObject.getAllGameObjects,
			meta3dState)
	})
}