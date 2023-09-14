import { execFunc as execFuncType } from "meta3d-engine-core-sceneview-protocol/src/contribute/work/PipelineContributeType"
import { getGL, getAllRenderComponents, getProgramMap, getState, getVBO } from "../Utils"
import { states } from "meta3d-pipeline-webgl1-render-protocol/src/StateType"
import { service as webgl1Service, webgl1Context, program, buffer } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-sceneview-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-sceneview-protocol/src/state/StateType"
import { programMap } from "meta3d-pipeline-webgl1-material-protocol/src/StateType"
import { verticesVBOMap, indicesVBOMap } from "meta3d-pipeline-webgl1-geometry-protocol/src/StateType"
import { service as immutableService } from "meta3d-immutable-protocol/src/service/ServiceType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { transform, localToWorldMatrix } from "meta3d-component-transform-protocol-common"
import { geometry, indicesCount } from "meta3d-component-geometry-protocol-common"
import { pbrMaterial } from "meta3d-component-pbrmaterial-protocol-common"
import { componentName as geometryName, dataName as geometryDataName } from "meta3d-component-geometry-protocol"
import { componentName as transformName, dataName as transformDataName } from "meta3d-component-transform-protocol"
import { componentName as pbrMaterialName, dataName as pbrMaterialDataName, diffuseColor } from "meta3d-component-pbrmaterial-protocol"

let _render = (webgl1Service: webgl1Service, gl: webgl1Context, verticesBuffer: buffer, indicesBuffer: buffer, program: program, diffuseColor: diffuseColor, modelMatrix: Float32Array, indicesCount: number) =>  {
	webgl1Service.useProgram(program, gl)

	webgl1Service.bindBuffer(webgl1Service.getArrayBuffer(gl), verticesBuffer, gl)
	webgl1Service.bindBuffer(webgl1Service.getElementArrayBuffer(gl), indicesBuffer, gl)

	const a_position = webgl1Service.getAttribLocation(program, "a_position", gl)
	webgl1Service.vertexAttribPointer(a_position, 3, webgl1Service.getFloat(gl), false, 0, 0, gl)
	webgl1Service.enableVertexAttribArray(a_position, gl)

	const u_model = webgl1Service.getUniformLocation(program, "u_model", gl)
	webgl1Service.uniformMatrix4fv(u_model, modelMatrix, gl)


	const u_color = webgl1Service.getUniformLocation(program, "u_color", gl)
	webgl1Service.uniform3f(u_color, diffuseColor[0], diffuseColor[1], diffuseColor[2], gl)


	webgl1Service.drawElements(webgl1Service.getTriangles(gl), indicesCount, webgl1Service.getUnsignedInt(gl), 0, gl)
}

let _getVBOBuffer = (immutableService: immutableService, geometryIndex: number, verticesVBOMap: verticesVBOMap, indicesVBOMap: indicesVBOMap) =>  {
	let verticesBuffer = getExn(immutableService.mapGet(verticesVBOMap, geometryIndex))
	let indicesBuffer = getExn(immutableService.mapGet(indicesVBOMap, geometryIndex))

	return { verticesBuffer, indicesBuffer }
}

let _getProgramData = (immutableService: immutableService, materialIndex: number, programMap: programMap) =>  {
	let program = getExn(immutableService.mapGet(programMap, materialIndex))

	return program
}

let _getRenderData = ([engineCoreService, immutableService]: [engineCoreService, immutableService], engineCoreState: engineCoreState, [transform, geometry, material,]: [transform, geometry, pbrMaterial], verticesVBOMap: verticesVBOMap, indicesVBOMap: indicesVBOMap, programMap: programMap) => : [
	{ verticesBuffer: buffer, indicesBuffer: buffer },
	indicesCount,
	program, diffuseColor, localToWorldMatrix
] {
	let { verticesBuffer, indicesBuffer } = _getVBOBuffer(immutableService, geometry, verticesVBOMap, indicesVBOMap)

	let indicesCount = getExn(engineCoreService.getComponentData<geometry, indicesCount>(engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, geometryName), geometry, geometryDataName.indicesCount))

	let diffuseColor = getExn(engineCoreService.getComponentData<pbrMaterial, diffuseColor>(engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, pbrMaterialName), material, pbrMaterialDataName.diffuseColor))


	let program = _getProgramData(immutableService, material, programMap)
	let modelMatrix = getExn(engineCoreService.getComponentData<transform, localToWorldMatrix>(engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, transformName), transform, transformDataName.localToWorldMatrix))

	return [{ verticesBuffer, indicesBuffer }, indicesCount, program, diffuseColor, modelMatrix]
}

let _clear = (webgl1Service: webgl1Service, gl: webgl1Context) =>  {
	webgl1Service.clearColor(0.0, 0.0, 0.0, 1.0, gl)
	webgl1Service.clear(webgl1Service.getColorBufferBit(gl) | webgl1Service.getDepthBufferBit(gl), gl);
}

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc, meta3dEngineCoreExtensionProtocolName }) => {
	let states = getStatesFunc<states>(meta3dState)
	let { mostService, immutableService, engineCoreService, webgl1Service } = getState(states)

	return mostService.callFunc(() => {
		console.log("render job")

		let { verticesVBOMap, indicesVBOMap } = getVBO(states)
		let programMap = getProgramMap(states)

		_clear(webgl1Service, getGL(states))

		getAllRenderComponents(states).forEach(({ transform, geometry, material }) => {
			let [{ verticesBuffer, indicesBuffer }, indicesCount, program, diffuseColor, modelMatrix] = _getRenderData([engineCoreService, immutableService], api.getExtensionState(meta3dState, meta3dEngineCoreExtensionProtocolName), [transform, geometry, material], verticesVBOMap, indicesVBOMap, programMap)

			_render(webgl1Service, getGL(states), verticesBuffer, indicesBuffer, program, diffuseColor, modelMatrix, indicesCount)
		})

		return meta3dState
	})
}