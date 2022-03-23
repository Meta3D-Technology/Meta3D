import { webgl1 } from "engine-commonlib-ts/src/dependency/webgl_1/interface/IWebGL1";
import { verticesVBOMap, indicesVBOMap, programMap } from "../Type";
import { getIndicesVBO, getVerticesVBO } from "../services/VBOService";
import { getProgram } from "../services/MaterialDoService";
import { getExn } from "engine-commonlib-ts/src/NullableUtils";
import { repo } from "engine-core/src/data/PipelineType.gen";
import { geometry, transform } from "engine-core/src/abstract/repo/ISceneGraphRepoForJs.gen";

export let render = (gl: WebGLRenderingContext, webgl1: webgl1, verticesBuffer: WebGLBuffer, indicesBuffer: WebGLBuffer, program: WebGLProgram, modelMatrix: Float32Array, count: number) => {
	webgl1.useProgram(gl, program);

	webgl1.bindBuffer(gl, webgl1.getArrayBufferType(gl), verticesBuffer);
	webgl1.bindBuffer(gl, webgl1.getElementArrayBufferType(gl), indicesBuffer);

	const a_position = webgl1.getAttribLocation(gl, program, "a_position");
	webgl1.vertexAttribPointer(gl, a_position, 3, webgl1.getBufferFloatType(gl), false, 0, 0);
	webgl1.enableVertexAttribArray(gl, a_position);

	const u_model = webgl1.getUniformLocation(gl, program, "u_model");
	webgl1.uniformMatrix4fv(gl, u_model, modelMatrix);

	webgl1.drawElements(gl, webgl1.getDrawTrianglesType(gl), count, webgl1.getBufferUnsignedIntType(gl), 0);
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

export function getRenderData(materialIndex:number, geometryIndex: number, geometry: geometry, transform: transform, verticesVBOMap: verticesVBOMap, indicesVBOMap: indicesVBOMap, programMap: programMap, repo: repo):[
	{verticesBuffer: WebGLBuffer, indicesBuffer: WebGLBuffer},
	number,
	WebGLProgram,
	Float32Array
] {
	let { verticesBuffer, indicesBuffer } = getVBOBuffer(geometryIndex, verticesVBOMap, indicesVBOMap);

	let count = getExn(repo.sceneGraphRepo.geometryRepo.getIndicesCount(geometry));

	let program = getProgramData(materialIndex, programMap);
	let modelMatrix: Float32Array = repo.sceneGraphRepo.transformRepo.getLocalToWorldMatrix(transform);

	return [{ verticesBuffer, indicesBuffer }, count, program, modelMatrix];
}