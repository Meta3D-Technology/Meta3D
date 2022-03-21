import { programMap } from "../Type";
import { getExnWebGL1 } from "engine-commonlib-ts/src/dependency/webgl_1/container/DPContainer";

export let createProgram = (gl: WebGLRenderingContext, vertexShaderSource: string, fragmentShaderSource: string) => {
	let webgl1 = getExnWebGL1();
	gl = <WebGLRenderingContext>gl;
	const vertexShader = webgl1.createShader(gl, webgl1.getVertexShaderType(gl));
	const fragmentShader = webgl1.createShader(gl, webgl1.getFragmentShaderType(gl));

	webgl1.shaderSource(gl, vertexShader, vertexShaderSource);
	webgl1.shaderSource(gl, fragmentShader, fragmentShaderSource);

	webgl1.compileShader(gl, vertexShader);

	if (!webgl1.getShaderParameter(gl, vertexShader, webgl1.getShaderCompileStatus(gl))) {
		throw new Error(webgl1.getShaderInfoLog(gl, vertexShader));
	}

	webgl1.compileShader(gl, fragmentShader);
	if (!webgl1.getShaderParameter(gl, fragmentShader, webgl1.getShaderCompileStatus(gl))) {
		throw new Error(webgl1.getShaderInfoLog(gl, fragmentShader));
	}

	const program = webgl1.createProgram(gl);
	webgl1.attachShader(gl, program, vertexShader);
	webgl1.attachShader(gl, program, fragmentShader);
	webgl1.linkProgram(gl, program);

	if (!webgl1.getProgramParameter(gl, program, webgl1.getProgramLinkStatus(gl))) {
		throw new Error(webgl1.getProgramInfoLog(gl, program));
	}

	return program;
};

export let setProgram = (programMap: programMap, material: number, program: WebGLProgram) => {
	return programMap.set(material, program)
}

export let getProgram = (programMap: programMap, material: number) => {
	return programMap.get(material);
}