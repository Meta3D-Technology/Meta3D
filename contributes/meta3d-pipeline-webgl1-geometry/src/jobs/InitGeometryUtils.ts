import { verticesVBOMap, indicesVBOMap } from "meta3d-pipeline-webgl1-geometry-protocol/src/StateType"
import { service as webgl1Service, webgl1Context } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as immutableService } from "meta3d-immutable-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-sceneview-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-sceneview-protocol/src/state/StateType"
import { geometry, vertices, indices } from "meta3d-component-geometry-protocol-common"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"
import { componentName, dataName } from "meta3d-component-geometry-protocol"

let _createVBOs = (webgl1Service: webgl1Service, gl: webgl1Context, vertices: vertices, indices: indices) =>  {
	let verticesBuffer = webgl1Service.createBuffer(gl)
	webgl1Service.bindBuffer(webgl1Service.getArrayBuffer(gl), verticesBuffer, gl)
	webgl1Service.bufferFloat32Data(webgl1Service.getArrayBuffer(gl), vertices, webgl1Service.getStaticDraw(gl), gl)

	let indicesBuffer = webgl1Service.createBuffer(gl)
	webgl1Service.bindBuffer(webgl1Service.getElementArrayBuffer(gl), indicesBuffer, gl)
	webgl1Service.bufferUint32Data(webgl1Service.getElementArrayBuffer(gl), indices, webgl1Service.getStaticDraw(gl), gl)

	return {
		verticesBuffer,
		indicesBuffer
	}
}

export function initGeometry([webgl1Service, engineCoreService, immutableService]: [webgl1Service, engineCoreService, immutableService],
	engineCoreState: engineCoreState,
	gl: webgl1Context, verticesVBOMap: verticesVBOMap, indicesVBOMap: indicesVBOMap, allGeometryIndices: number[],
) {
	let usedGeometryContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, componentName)

	return allGeometryIndices.reduce(([verticesVBOMap, indicesVBOMap], geometry) => {
		if (!isNullable(immutableService.mapGet(verticesVBOMap, geometry))) {
			return [verticesVBOMap, indicesVBOMap]
		}

		let vertices = getExn(engineCoreService.getComponentData<geometry, vertices>(usedGeometryContribute, geometry, dataName.vertices))
		let indices = getExn(engineCoreService.getComponentData<geometry, indices>(usedGeometryContribute, geometry, dataName.indices))

		let { verticesBuffer, indicesBuffer } = _createVBOs(webgl1Service, gl, vertices, indices);

		return [
			immutableService.mapSet(verticesVBOMap, geometry, verticesBuffer),
			immutableService.mapSet(indicesVBOMap, geometry, indicesBuffer)
		]
	}, [verticesVBOMap, indicesVBOMap]);
}