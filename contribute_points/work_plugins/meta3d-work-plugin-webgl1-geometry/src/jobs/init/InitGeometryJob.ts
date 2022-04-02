import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { getAllGeometryIndices, getGL, getState, setState } from "../Utils"
import { states } from "meta3d-work-plugin-webgl1-geometry-protocol"
import { initGeometry } from "../InitGeometryUtils"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, webgl1Service, engineCoreService, immutableService, vbo, geometryData, workPluginWhichHasAllGeometryIndicesName } = getState(states)

	return mostService.callFunc(() => {
		console.log("init geometry job");

		let verticesVBOMap = getExn(vbo.verticesVBOMap)
		let indicesVBOMap = getExn(vbo.indicesVBOMap)

		let [newVerticesVBOMap, newIndicesVBOMap] = initGeometry([webgl1Service, engineCoreService, immutableService],
			engineCoreState,
			getGL(states), verticesVBOMap, indicesVBOMap, getAllGeometryIndices(states, workPluginWhichHasAllGeometryIndicesName), geometryData)

		return setStatesFunc<states>(
			engineCoreState,
			setState(states, {
				...getState(states),
				vbo: {
					verticesVBOMap: newVerticesVBOMap,
					indicesVBOMap: newIndicesVBOMap
				}
			})
		)
	})
}