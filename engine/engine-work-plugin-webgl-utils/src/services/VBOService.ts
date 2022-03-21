import { getExnWebGL1 } from "engine-commonlib-ts/src/dependency/webgl_1/container/DPContainer";
import { verticesVBOMap, indicesVBOMap } from "../Type";

export let createVBOs = (gl: WebGLRenderingContext, vertices: Float32Array, indices: Uint32Array) => {
	let webgl1 = getExnWebGL1();
	
	let verticesBuffer = webgl1.createBuffer(gl);
	webgl1.bindBuffer(gl, webgl1.getArrayBufferType(gl), verticesBuffer);
	webgl1.bufferFloat32ArrayData(gl, webgl1.getArrayBufferType(gl), webgl1.getStaticDraw(gl), vertices);

	let indicesBuffer = webgl1.createBuffer(gl);
	webgl1.bindBuffer(gl, webgl1.getElementArrayBufferType(gl), indicesBuffer);
	webgl1.bufferUint32ArrayData(gl, webgl1.getElementArrayBufferType(gl), webgl1.getStaticDraw(gl), indices);

	return {
		verticesBuffer,
		indicesBuffer
	}
}

export let getVerticesVBO = (verticesVBOMap: verticesVBOMap, geometryIndex: number) => {
	return verticesVBOMap.get(geometryIndex);
}

export let setVerticesVBO = (verticesVBOMap: verticesVBOMap, geometryIndex: number, verticesBuffer: WebGLBuffer) => {
	return verticesVBOMap.set(geometryIndex, verticesBuffer);
}

export let getIndicesVBO = (indicesVBOMap: indicesVBOMap, geometryIndex: number) => {
	return indicesVBOMap.get(geometryIndex);
}

export let setIndicesVBO = (indicesVBOMap: indicesVBOMap, geometryIndex: number, indicesBuffer: WebGLBuffer) => {
	return indicesVBOMap.set(geometryIndex, indicesBuffer)
}