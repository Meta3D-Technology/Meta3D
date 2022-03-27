import { programMap } from "../Type"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as immutableService } from "meta3d-immutable-protocol/src/service/ServiceType"

export let createProgram = (webgl1Service: webgl1Service, gl: WebGLRenderingContext, vertexShaderSource: string, fragmentShaderSource: string) => {
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

export let setProgram = (programMap: programMap, immutableService: immutableService, material: number, program: WebGLProgram) => {
	return immutableService.mapSet(programMap, material, program)
}

export let getProgram = (immutableService: immutableService, programMap: programMap, material: number) => {
	return immutableService.mapGet(programMap, material)
}