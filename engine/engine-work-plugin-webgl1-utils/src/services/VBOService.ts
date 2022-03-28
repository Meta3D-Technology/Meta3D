// TODO remove VBOService

import { verticesVBOMap, indicesVBOMap } from "../Type"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as immutableService } from "meta3d-immutable-protocol/src/service/ServiceType"

export let createVBOs = (webgl1Service: webgl1Service, gl: WebGLRenderingContext, vertices: Float32Array, indices: Uint32Array) => {
	let verticesBuffer = webgl1Service.createBuffer(gl)
	webgl1Service.bindBuffer(gl, webgl1Service.getArrayBufferType(gl), verticesBuffer)
	webgl1Service.bufferFloat32ArrayData(gl, webgl1Service.getArrayBufferType(gl), webgl1Service.getStaticDraw(gl), vertices)

	let indicesBuffer = webgl1Service.createBuffer(gl)
	webgl1Service.bindBuffer(gl, webgl1Service.getElementArrayBufferType(gl), indicesBuffer)
	webgl1Service.bufferUint32ArrayData(gl, webgl1Service.getElementArrayBufferType(gl), webgl1Service.getStaticDraw(gl), indices)

	return {
		verticesBuffer,
		indicesBuffer
	}
}

export let getVerticesVBO = (immutableService: immutableService, verticesVBOMap: verticesVBOMap, geometryIndex: number) => {
	return immutableService.mapGet(verticesVBOMap, geometryIndex)
}

export let setVerticesVBO = (verticesVBOMap: verticesVBOMap, immutableService: immutableService, geometryIndex: number, verticesBuffer: WebGLBuffer) => {
	return immutableService.mapSet(verticesVBOMap, geometryIndex, verticesBuffer)
}

export let getIndicesVBO = (immutableService: immutableService, indicesVBOMap: indicesVBOMap, geometryIndex: number) => {
	return immutableService.mapGet(indicesVBOMap, geometryIndex)
}

export let setIndicesVBO = (indicesVBOMap: indicesVBOMap, immutableService: immutableService, geometryIndex: number, indicesBuffer: WebGLBuffer) => {
	return immutableService.mapSet(indicesVBOMap, geometryIndex, indicesBuffer)
}