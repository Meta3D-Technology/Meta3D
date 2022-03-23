import { verticesVBOMap, indicesVBOMap, programMap } from "../Type";
import { getIndicesVBO, getVerticesVBO } from "../services/VBOService";
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { pbrMaterial } from "meta3d-component-pbrmaterial-protocol";
import { componentName as transformComponentName, transform, localToWorldMatrix, dataName as transformDataName } from "meta3d-component-transform-protocol";
import { componentName as geometryComponentName, dataName as geometryDataName, geometry, indicesCount } from "meta3d-component-geometry-protocol";
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { getProgram } from "../services/MaterialDoService";

export let render = (webgl1Service: webgl1Service, gl: WebGLRenderingContext, verticesBuffer: WebGLBuffer, indicesBuffer: WebGLBuffer, program: WebGLProgram, modelMatrix: Float32Array, count: number) => {
	webgl1Service.useProgram(gl, program);

	webgl1Service.bindBuffer(gl, webgl1Service.getArrayBufferType(gl), verticesBuffer);
	webgl1Service.bindBuffer(gl, webgl1Service.getElementArrayBufferType(gl), indicesBuffer);

	const a_position = webgl1Service.getAttribLocation(gl, program, "a_position");
	webgl1Service.vertexAttribPointer(gl, a_position, 3, webgl1Service.getBufferFloatType(gl), false, 0, 0);
	webgl1Service.enableVertexAttribArray(gl, a_position);

	const u_model = webgl1Service.getUniformLocation(gl, program, "u_model");
	webgl1Service.uniformMatrix4fv(gl, u_model, modelMatrix);

	webgl1Service.drawElements(gl, webgl1Service.getDrawTrianglesType(gl), count, webgl1Service.getBufferUnsignedIntType(gl), 0);
}

export let getVBOBuffer = (geometryIndex: number, verticesVBOMap: verticesVBOMap, indicesVBOMap: indicesVBOMap) => {
	let verticesBuffer = getExn(getVerticesVBO(verticesVBOMap, geometryIndex));
	let indicesBuffer = getExn(getIndicesVBO(indicesVBOMap, geometryIndex));

	return { verticesBuffer, indicesBuffer };
}

export let getProgramData = (materialIndex: number, programMap: programMap) => {
	let program = getExn(getProgram(programMap, materialIndex));

	return program;
}

export function getRenderData(engineCoreState: engineCoreState, engineCoreService: engineCoreService, material: pbrMaterial, geometry: geometry, transform: transform, verticesVBOMap: verticesVBOMap, indicesVBOMap: indicesVBOMap, programMap: programMap): [
	{ verticesBuffer: WebGLBuffer, indicesBuffer: WebGLBuffer },
	number,
	WebGLProgram,
	Float32Array
] {
	let { verticesBuffer, indicesBuffer } = getVBOBuffer(geometry, verticesVBOMap, indicesVBOMap);

	let count = getExn(engineCoreService.getComponentData<geometry, indicesCount>(engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, geometryComponentName), geometry, geometryDataName.indicesCount));

	let program = getProgramData(material, programMap);
	let modelMatrix = getExn(engineCoreService.getComponentData<transform, localToWorldMatrix>(engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, transformComponentName), transform, transformDataName.localToWorldMatrix));

	return [{ verticesBuffer, indicesBuffer }, count, program, modelMatrix];
}