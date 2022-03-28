import { execFunc as execFuncType } from "../../Type"
import { getGL, getState } from "../Utils"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { initGeometryUtils } from "engine-work-plugin-webgl1-utils/src/utils/InitGeometryJobUtils"
import { states } from "engine-work-plugin-webgl1-protocol"
import { componentName, geometry, dataName, vertices, indices } from "meta3d-component-geometry-protocol"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, webgl1Service, engineCoreService, immutableService, vbo } = getState(states)

	return mostService.callFunc(() => {
		console.log("init webgl job init geometry job exec")

		let verticesVBOMap = getExn(vbo.verticesVBOMap)
		let indicesVBOMap = getExn(vbo.indicesVBOMap)

		let usedGeometryContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, componentName)
		let allGeometryIndices = engineCoreService.getAllComponents<geometry>(usedGeometryContribute)

		// let [newVerticesVBOMap, newIndicesVBOMap] = initGeometryUtils(engineCoreState, [webgl1Service, engineCoreService], gl, verticesVBOMap, indicesVBOMap, allGeometryIndices,)
		let [newVerticesVBOMap, newIndicesVBOMap] = initGeometryUtils([webgl1Service, immutableService],
			[
				(usedGeometryContribute, geometry) => getExn(engineCoreService.getComponentData<geometry, vertices>(usedGeometryContribute, geometry, dataName.vertices)),
				(usedGeometryContribute, geometry) => getExn(engineCoreService.getComponentData<geometry, indices>(usedGeometryContribute, geometry, dataName.indices)),
			],
			getGL(states), verticesVBOMap, indicesVBOMap, allGeometryIndices, engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, componentName))

		return setStatesFunc(engineCoreState, {
			...states,
			"engine-work-plugin-webgl1": {
				...getState(states),
				vbo: {
					verticesVBOMap: newVerticesVBOMap,
					indicesVBOMap: newIndicesVBOMap
				}
			}
		})
	})
}