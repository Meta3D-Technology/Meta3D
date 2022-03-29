import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType"
import { getGL, getPMatrix, getProgramMap, getState, getViewMatrix } from "../Utils"
import { states, viewMatrix, pMatrix } from "meta3d-work-plugin-webgl1-senduniformshaderdata-protocol"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { programMap } from "meta3d-work-plugin-webgl1-material-protocol"

function _sendCameraData (webgl1Service: webgl1Service, gl: WebGLRenderingContext, programMap: programMap, viewMatrix: viewMatrix, pMatrix: pMatrix) {
	programMap.forEach((program) => {
		webgl1Service.useProgram(gl, program);

		let u_view = webgl1Service.getUniformLocation(gl, program, "u_view");
		let u_perspective = webgl1Service.getUniformLocation(gl, program, "u_projection");

		webgl1Service.uniformMatrix4fv(gl, u_view, viewMatrix);
		webgl1Service.uniformMatrix4fv(gl, u_perspective, pMatrix);
	})
}

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, webgl1Service, workPluginWhichHasUniformShaderDataName } = getState(states)

	return mostService.callFunc(() => {
		console.log("send uniform shader data job")

		_sendCameraData(webgl1Service, getGL(states), getProgramMap(states), getViewMatrix(states, workPluginWhichHasUniformShaderDataName), getPMatrix(states, workPluginWhichHasUniformShaderDataName))

		return engineCoreState
	})
}