import { programMap } from "meta3d-work-plugin-webgl1-material-protocol"
import { getFragGLSL, getVertGLSL } from "./GLSLUtils"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as immutableService } from "meta3d-immutable-protocol/src/service/ServiceType"

function _createProgram (webgl1Service: webgl1Service, gl: WebGLRenderingContext, vertexShaderSource: string, fragmentShaderSource: string) {
	gl = <WebGLRenderingContext>gl
	const vertexShader = webgl1Service.createShader(gl, webgl1Service.getVertexShaderType(gl))
	const fragmentShader = webgl1Service.createShader(gl, webgl1Service.getFragmentShaderType(gl))

	webgl1Service.shaderSource(gl, vertexShader, vertexShaderSource)
	webgl1Service.shaderSource(gl, fragmentShader, fragmentShaderSource)

	webgl1Service.compileShader(gl, vertexShader)

	if (!webgl1Service.getShaderParameter(gl, vertexShader, webgl1Service.getShaderCompileStatus(gl))) {
		throw new Error(webgl1Service.getShaderInfoLog(gl, vertexShader))
	}

	webgl1Service.compileShader(gl, fragmentShader)
	if (!webgl1Service.getShaderParameter(gl, fragmentShader, webgl1Service.getShaderCompileStatus(gl))) {
		throw new Error(webgl1Service.getShaderInfoLog(gl, fragmentShader))
	}

	const program = webgl1Service.createProgram(gl)
	webgl1Service.attachShader(gl, program, vertexShader)
	webgl1Service.attachShader(gl, program, fragmentShader)
	webgl1Service.linkProgram(gl, program)

	if (!webgl1Service.getProgramParameter(gl, program, webgl1Service.getProgramLinkStatus(gl))) {
		throw new Error(webgl1Service.getProgramInfoLog(gl, program))
	}

	return program
}

export function initMaterial ([webgl1Service, immutableService]: [webgl1Service, immutableService], gl: WebGLRenderingContext, programMap: programMap, allMaterialIndices: number[]) {
	let vertexShaderSource = getVertGLSL()
	let fragmentShaderSource = getFragGLSL()

	return allMaterialIndices.reduce((programMap, materialIndex) => {
		let program = _createProgram(webgl1Service, gl, vertexShaderSource, fragmentShaderSource)

		return immutableService.mapSet(programMap, materialIndex, program)
	}, programMap)

}