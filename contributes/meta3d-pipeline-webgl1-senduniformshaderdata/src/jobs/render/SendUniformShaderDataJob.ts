import { execFunc as execFuncType } from "meta3d-engine-core-sceneview-protocol/src/contribute/work/PipelineContributeType"
import { getGL, getPMatrix, getProgramMap, getState, getViewMatrix } from "../Utils"
import { states, viewMatrix, pMatrix } from "meta3d-pipeline-webgl1-senduniformshaderdata-protocol/src/StateType"
import { service as webgl1Service, webgl1Context } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { programMap } from "meta3d-pipeline-webgl1-material-protocol/src/StateType"

let _sendCameraData = (webgl1Service: webgl1Service, gl: webgl1Context, programMap: programMap, viewMatrix: viewMatrix, pMatrix: pMatrix) =>  {
	programMap.forEach((program) => {
		webgl1Service.useProgram(program, gl);

		let u_view = webgl1Service.getUniformLocation(program, "u_view", gl);
		let u_perspective = webgl1Service.getUniformLocation(program, "u_projection", gl);

		webgl1Service.uniformMatrix4fv(u_view, viewMatrix, gl);
		webgl1Service.uniformMatrix4fv(u_perspective, pMatrix, gl);
	})
}

export let execFunc: execFuncType = (meta3dState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(meta3dState)
	let { mostService, webgl1Service } = getState(states)

	return mostService.callFunc(() => {
		console.log("send uniform shader data job")

		_sendCameraData(webgl1Service, getGL(states), getProgramMap(states), getViewMatrix(states), getPMatrix(states))

		return meta3dState
	})
}