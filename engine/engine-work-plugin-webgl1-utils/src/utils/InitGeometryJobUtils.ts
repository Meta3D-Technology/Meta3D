import { verticesVBOMap, indicesVBOMap } from "../Type";
import { createVBOs, setIndicesVBO, setVerticesVBO } from "../services/VBOService";
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as immutableService } from "meta3d-immutable-protocol/src/service/ServiceType"
// import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { usedComponentContribute } from "meta3d-engine-core-protocol/src/state/RegisterComponentType"
// import { state } from "meta3d-engine-core-protocol/src/state/StateType"
// import { componentName, geometry, dataName, vertices, indices } from "meta3d-component-geometry-protocol";
// import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";

// export let initGeometryUtils = (engineCoreState: state, [webgl1Service, engineCoreService]: [webgl1Service, engineCoreService], gl: WebGLRenderingContext, verticesVBOMap: verticesVBOMap, indicesVBOMap: indicesVBOMap, allGeometryIndices: number[], [usedGeometryContribute]: [usedComponentContribute]) => {
export let initGeometryUtils = ([webgl1Service, immutableService]: [webgl1Service, immutableService], [getVerticesFunc, getIndicesFunc]: [
	(usedGeometryContribute: usedComponentContribute, geometry: number) => Float32Array,
	(usedGeometryContribute: usedComponentContribute, geometry: number) => Uint32Array,
], gl: WebGLRenderingContext, verticesVBOMap: verticesVBOMap, indicesVBOMap: indicesVBOMap, allGeometryIndices: number[], usedGeometryContribute: usedComponentContribute) => {
	// let usedGeometryContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, componentName)


	// let toComponent = repo.sceneGraphRepo.geometryRepo.toComponent;
	// let getVertices = repo.sceneGraphRepo.geometryRepo.getVertices;
	// let getIndices = repo.sceneGraphRepo.geometryRepo.getIndices;
	// let toComponent = repo.sceneGraphRepo.geometryRepo.toComponent;
	// let getVertices = engineCoreService.getComponentData
	// let getIndices = engineCoreService.getComponentData
	// let getIndices = repo.sceneGraphRepo.geometryRepo.getIndices;

	return allGeometryIndices.reduce(([verticesVBOMap, indicesVBOMap], geometry) => {
		// let geometry = toComponent(geometryIndex);

		// let vertices = getExn(engineCoreService.getComponentData<geometry, vertices>(usedGeometryContribute, geometry, dataName.vertices))
		// let indices = getExn(engineCoreService.getComponentData<geometry, indices>(usedGeometryContribute, geometry, dataName.indices))
		let vertices = getVerticesFunc(usedGeometryContribute, geometry)
		let indices = getIndicesFunc(usedGeometryContribute, geometry)

		let { verticesBuffer, indicesBuffer } = createVBOs(webgl1Service, gl, vertices, indices);

		return [
			setVerticesVBO(verticesVBOMap, immutableService, geometry, verticesBuffer),
			setIndicesVBO(indicesVBOMap, immutableService, geometry, indicesBuffer)
		]
	}, [verticesVBOMap, indicesVBOMap]);
}