import { execFunc as execFuncType } from "../../Type"
import { getState } from "../Utils"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { states } from "engine-work-plugin-webgl1-protocol"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, webgl1Service, gl } = getState(states)

	return mostService.callFunc(() => {
		console.log("init webgl job init wegl extension exec")
		gl = getExn(gl)

		webgl1Service.getExtension(gl, "OES_element_index_uint")

		return engineCoreState
	})
}