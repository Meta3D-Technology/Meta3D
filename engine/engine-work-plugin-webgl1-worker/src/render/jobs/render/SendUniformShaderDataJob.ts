import { execFunc as execFuncType } from "../../Type"
import { getState } from "../../Utils"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { states } from "engine-work-plugin-webgl1-worker-render-protocol"
import { sendCameraData } from "engine-work-plugin-webgl1-utils/src/utils/SendCameraDataUtils"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, webgl1Service, gl, material, viewMatrix, pMatrix } = getState(states)

	return mostService.callFunc(() => {
		console.log("send uniform shader data job webgl worker exec on worker thread")

		let programMap = material.programMap

		sendCameraData(webgl1Service, getExn(gl), programMap, getExn(viewMatrix), getExn(pMatrix))

		return engineCoreState
	})
}