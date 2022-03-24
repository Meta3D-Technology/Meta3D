import { verticesVBOMap, indicesVBOMap } from "../Type";
import { createVBOs, setIndicesVBO, setVerticesVBO } from "../services/VBOService";
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state } from "meta3d-engine-core-protocol/src/state/StateType"
import { componentName, geometry, dataName } from "meta3d-component-geometry-protocol";
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";

export let initGeometryUtils = (engineCoreState: state, [webgl1Service, engineCoreService]: [webgl1Service, engineCoreService], gl: WebGLRenderingContext, verticesVBOMap: verticesVBOMap, indicesVBOMap: indicesVBOMap, allGeometryIndices: number[]) => {
	let usedGeometryContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, componentName)

	// let toComponent = repo.sceneGraphRepo.geometryRepo.toComponent;
	// let getVertices = repo.sceneGraphRepo.geometryRepo.getVertices;
	// let getIndices = repo.sceneGraphRepo.geometryRepo.getIndices;
	// let toComponent = repo.sceneGraphRepo.geometryRepo.toComponent;
	// let getVertices = engineCoreService.getComponentData
	// let getIndices = engineCoreService.getComponentData
	// let getIndices = repo.sceneGraphRepo.geometryRepo.getIndices;

	return allGeometryIndices.reduce(([verticesVBOMap, indicesVBOMap], geometry) => {
		// let geometry = toComponent(geometryIndex);

		let vertices = getExn(engineCoreService.getComponentData<geometry, Float32Array>(usedGeometryContribute, geometry, dataName.vertices))
		let indices = getExn(engineCoreService.getComponentData<geometry, Uint32Array>(usedGeometryContribute, geometry, dataName.indices))

		let { verticesBuffer, indicesBuffer } = createVBOs(webgl1Service, gl, vertices, indices);

		return [
			// setVerticesVBO(verticesVBOMap, geometryIndex, verticesBuffer),
			// setIndicesVBO(indicesVBOMap, geometryIndex, indicesBuffer)
			setVerticesVBO(verticesVBOMap, geometry, verticesBuffer),
			setIndicesVBO(indicesVBOMap, geometry, indicesBuffer)
		]
	}, [verticesVBOMap, indicesVBOMap]);
}