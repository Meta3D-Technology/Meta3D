import { verticesVBOMap, indicesVBOMap } from "../Type";
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"

export let createVBOs = (webgl1Service: webgl1Service, gl: WebGLRenderingContext, vertices: Float32Array, indices: Uint32Array) => {
	let verticesBuffer = webgl1Service.createBuffer(gl);
	webgl1Service.bindBuffer(gl, webgl1Service.getArrayBufferType(gl), verticesBuffer);
	webgl1Service.bufferFloat32ArrayData(gl, webgl1Service.getArrayBufferType(gl), webgl1Service.getStaticDraw(gl), vertices);

	let indicesBuffer = webgl1Service.createBuffer(gl);
	webgl1Service.bindBuffer(gl, webgl1Service.getElementArrayBufferType(gl), indicesBuffer);
	webgl1Service.bufferUint32ArrayData(gl, webgl1Service.getElementArrayBufferType(gl), webgl1Service.getStaticDraw(gl), indices);

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