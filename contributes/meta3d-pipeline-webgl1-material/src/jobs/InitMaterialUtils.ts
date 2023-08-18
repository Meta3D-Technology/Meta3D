import { programMap } from "meta3d-pipeline-webgl1-material-protocol/src/StateType"
import { getFragGLSL, getVertGLSL } from "./GLSLUtils"
import { service as webgl1Service, webgl1Context } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as immutableService } from "meta3d-immutable-protocol/src/service/ServiceType"
import { isNullable } from "meta3d-commonlib-ts/src/NullableUtils"

let _createProgram = (webgl1Service: webgl1Service, gl: webgl1Context, vertexShaderSource: string, fragmentShaderSource: string) =>  {
	const vertexShader = webgl1Service.createShader(webgl1Service.getVertexShader(gl), gl)
	const fragmentShader = webgl1Service.createShader(webgl1Service.getFragmentShader(gl), gl)

	webgl1Service.shaderSource(vertexShader, vertexShaderSource, gl)
	webgl1Service.shaderSource(fragmentShader, fragmentShaderSource, gl)

	webgl1Service.compileShader(vertexShader, gl)

	if (!webgl1Service.getShaderParameter(vertexShader, webgl1Service.getCompileStatus(gl), gl)) {
		throw new Error(webgl1Service.getShaderInfoLog(vertexShader, gl))
	}

	webgl1Service.compileShader(fragmentShader, gl)
	if (!webgl1Service.getShaderParameter(fragmentShader, webgl1Service.getCompileStatus(gl), gl)) {
		throw new Error(webgl1Service.getShaderInfoLog(fragmentShader, gl))
	}

	const program = webgl1Service.createProgram(gl)
	webgl1Service.attachShader(program, vertexShader, gl)
	webgl1Service.attachShader(program, fragmentShader, gl)
	webgl1Service.linkProgram(program, gl)

	if (!webgl1Service.getProgramParameter(program, webgl1Service.getLinkStatus(gl), gl)) {
		throw new Error(webgl1Service.getProgramInfoLog(program, gl))
	}

	return program
}

export let initMaterial = ([webgl1Service, immutableService]: [webgl1Service, immutableService], gl: webgl1Context, programMap: programMap, allMaterialIndices: number[]) =>  {
	let vertexShaderSource = getVertGLSL()
	let fragmentShaderSource = getFragGLSL()

	return allMaterialIndices.reduce((programMap, materialIndex) => {
		if (!isNullable(immutableService.mapGet(programMap, materialIndex))) {
			return programMap
		}

		let program = _createProgram(webgl1Service, gl, vertexShaderSource, fragmentShaderSource)

		return immutableService.mapSet(programMap, materialIndex, program)
	}, programMap)

}