import { execFunc as execFuncType } from "../../Type"
import { getGL, getAllRenderComponents, getProgramMap, getState, getVBO } from "../Utils"
import { geometryData, states, transformData } from "meta3d-work-plugin-webgl1-render-protocol"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { programMap } from "meta3d-work-plugin-webgl1-material-protocol"
import { verticesVBOMap, indicesVBOMap } from "meta3d-work-plugin-webgl1-geometry-protocol"
import { service as immutableService } from "meta3d-immutable-protocol/src/service/ServiceType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { transform, localToWorldMatrix } from "meta3d-component-transform-common-protocol"
import { geometry, indicesCount } from "meta3d-component-geometry-common-protocol"
import { pbrMaterial } from "meta3d-component-pbrmaterial-common-protocol"

function _render(webgl1Service: webgl1Service, gl: WebGLRenderingContext, verticesBuffer: WebGLBuffer, indicesBuffer: WebGLBuffer, program: WebGLProgram, modelMatrix: Float32Array, indicesCount: number) {
	webgl1Service.useProgram(gl, program)

	webgl1Service.bindBuffer(gl, webgl1Service.getArrayBufferType(gl), verticesBuffer)
	webgl1Service.bindBuffer(gl, webgl1Service.getElementArrayBufferType(gl), indicesBuffer)

	const a_position = webgl1Service.getAttribLocation(gl, program, "a_position")
	webgl1Service.vertexAttribPointer(gl, a_position, 3, webgl1Service.getBufferFloatType(gl), false, 0, 0)
	webgl1Service.enableVertexAttribArray(gl, a_position)

	const u_model = webgl1Service.getUniformLocation(gl, program, "u_model")
	webgl1Service.uniformMatrix4fv(gl, u_model, modelMatrix)

	webgl1Service.drawElements(gl, webgl1Service.getDrawTrianglesType(gl), indicesCount, webgl1Service.getBufferUnsignedIntType(gl), 0)
}

function _getVBOBuffer(immutableService: immutableService, geometryIndex: number, verticesVBOMap: verticesVBOMap, indicesVBOMap: indicesVBOMap) {
	let verticesBuffer = getExn(immutableService.mapGet(verticesVBOMap, geometryIndex))
	let indicesBuffer = getExn(immutableService.mapGet(indicesVBOMap, geometryIndex))

	return { verticesBuffer, indicesBuffer }
}

function _getProgramData(immutableService: immutableService, materialIndex: number, programMap: programMap) {
	let program = getExn(immutableService.mapGet(programMap, materialIndex))

	return program
}

function _getRenderData([engineCoreService, immutableService]: [engineCoreService, immutableService], engineCoreState: engineCoreState, [transform, geometry, material,]: [transform, geometry, pbrMaterial], [geometryData, transformData]: [geometryData, transformData], verticesVBOMap: verticesVBOMap, indicesVBOMap: indicesVBOMap, programMap: programMap): [
	{ verticesBuffer: WebGLBuffer, indicesBuffer: WebGLBuffer },
	indicesCount,
	WebGLProgram, localToWorldMatrix
] {
	let { verticesBuffer, indicesBuffer } = _getVBOBuffer(immutableService, geometry, verticesVBOMap, indicesVBOMap)

	let indicesCount = getExn(engineCoreService.getComponentData<geometry, indicesCount>(engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, geometryData.componentName), geometry, geometryData.indicesCountDataName))

	let program = _getProgramData(immutableService, material, programMap)
	let modelMatrix = getExn(engineCoreService.getComponentData<transform, localToWorldMatrix>(engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, transformData.componentName), transform, transformData.localToWorldMatrixDataName))

	return [{ verticesBuffer, indicesBuffer }, indicesCount, program, modelMatrix]
}

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, immutableService, engineCoreService, webgl1Service, workPluginWhichHasAllRenderComponentsName, transformData, geometryData } = getState(states)

	return mostService.callFunc(() => {
		console.log("render job")

		let { verticesVBOMap, indicesVBOMap } = getVBO(states)
		let programMap = getProgramMap(states)

		getAllRenderComponents(states, workPluginWhichHasAllRenderComponentsName).forEach(({ transform, geometry, material }) => {
			let [{ verticesBuffer, indicesBuffer }, indicesCount, program, modelMatrix] = _getRenderData([engineCoreService, immutableService], engineCoreState, [transform, geometry, material], [geometryData, transformData], verticesVBOMap, indicesVBOMap, programMap)

			_render(webgl1Service, getGL(states), verticesBuffer, indicesBuffer, program, modelMatrix, indicesCount)
		})

		return engineCoreState
	})
}