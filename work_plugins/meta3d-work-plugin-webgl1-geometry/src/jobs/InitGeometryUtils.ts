import { verticesVBOMap, indicesVBOMap, geometryData } from "meta3d-work-plugin-webgl1-geometry-protocol"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as immutableService } from "meta3d-immutable-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { geometry, vertices, indices } from "meta3d-component-geometry-common-protocol"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"

let _createVBOs = (webgl1Service: webgl1Service, gl: WebGLRenderingContext, vertices: vertices, indices: indices) => {
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

export let initGeometry = ([webgl1Service, engineCoreService, immutableService]: [webgl1Service, engineCoreService, immutableService],
	engineCoreState: engineCoreState,
	gl: WebGLRenderingContext, verticesVBOMap: verticesVBOMap, indicesVBOMap: indicesVBOMap, allGeometryIndices: number[],
	{ componentName, verticesDataName, indicesDataName }: geometryData
) => {
	let usedGeometryContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, componentName)

	return allGeometryIndices.reduce(([verticesVBOMap, indicesVBOMap], geometry) => {
		let vertices = getExn(engineCoreService.getComponentData<geometry, vertices>(usedGeometryContribute, geometry, verticesDataName))
		let indices = getExn(engineCoreService.getComponentData<geometry, indices>(usedGeometryContribute, geometry, indicesDataName))

		let { verticesBuffer, indicesBuffer } = _createVBOs(webgl1Service, gl, vertices, indices);

		return [
			immutableService.mapSet(verticesVBOMap, geometry, verticesBuffer),
			immutableService.mapSet(indicesVBOMap, geometry, indicesBuffer)
		]
	}, [verticesVBOMap, indicesVBOMap]);
}