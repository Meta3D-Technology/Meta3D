import { range } from "lodash"
import { getRenderData, render } from "engine-work-plugin-webgl1-utils/src/utils/RenderUtils"
import { execFunc as execFuncType } from "../../Type"
import { getGL, getMaterial, getState, getVBO } from "../../Utils"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { states } from "engine-work-plugin-webgl1-worker-render-protocol"
import { componentName as transformComponentName, transform, localToWorldMatrix, dataName as transformDataName } from "meta3d-component-transform-worker-protocol";
import { componentName as geometryComponentName, dataName as geometryDataName, geometry, indicesCount } from "meta3d-component-geometry-worker-protocol";

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, engineCoreService, webgl1Service, immutableService, renderGameObjectsCount, typeArray } = getState(states)

	return mostService.callFunc(() => {
		console.log("render job webgl worker exec on worker thread")

		let renderDataBufferTypeArray = getExn(typeArray)

		let { verticesVBOMap, indicesVBOMap } = getVBO(states)
		let programMap = getMaterial(states).programMap

		range(0, renderGameObjectsCount).forEach(renderGameObjectIndex => {
			let geometryIndex = renderDataBufferTypeArray[renderGameObjectIndex * 3]
			let materialIndex = renderDataBufferTypeArray[renderGameObjectIndex * 3 + 1]
			let transformIndex = renderDataBufferTypeArray[renderGameObjectIndex * 3 + 2]

			let geometry = geometryIndex
			let material = materialIndex
			let transform = transformIndex

			let count = getExn(engineCoreService.getComponentData<geometry, indicesCount>(engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, geometryComponentName), geometry, geometryDataName.indicesCount));
			let modelMatrix = getExn(engineCoreService.getComponentData<transform, localToWorldMatrix>(engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, transformComponentName), transform, transformDataName.localToWorldMatrix));

			let [{ verticesBuffer, indicesBuffer }, program] = getRenderData(immutableService, material, geometry, verticesVBOMap, indicesVBOMap, programMap)

			render(webgl1Service, getGL(states), verticesBuffer, indicesBuffer, program, modelMatrix, count)
		})

		return engineCoreState
	})
}
