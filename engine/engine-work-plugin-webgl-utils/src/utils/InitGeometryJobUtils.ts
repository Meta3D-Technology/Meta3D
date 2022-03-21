import { verticesVBOMap, indicesVBOMap } from "../Type";
import { createVBOs, setIndicesVBO, setVerticesVBO } from "../services/VBOService";
import { repo } from "engine-core/src/data/PipelineType.gen";

export let initGeometryUtils = (gl: WebGLRenderingContext, verticesVBOMap: verticesVBOMap, indicesVBOMap: indicesVBOMap, allGeometriesIndices: number[], repo: repo) => {

	let toComponent = repo.sceneGraphRepo.geometryRepo.toComponent;
	let getVertices = repo.sceneGraphRepo.geometryRepo.getVertices;
	let getIndices = repo.sceneGraphRepo.geometryRepo.getIndices;

	return allGeometriesIndices.reduce(([verticesVBOMap, indicesVBOMap], geometryIndex) => {
		let geometry = toComponent(geometryIndex);

		let vertices = getVertices(geometry) as Float32Array;
		let indices = getIndices(geometry) as Uint32Array;

		let { verticesBuffer, indicesBuffer } = createVBOs(gl, vertices, indices);

		return [
			setVerticesVBO(verticesVBOMap, geometryIndex, verticesBuffer),
			setIndicesVBO(indicesVBOMap, geometryIndex, indicesBuffer)
		]
	}, [verticesVBOMap, indicesVBOMap]);
}