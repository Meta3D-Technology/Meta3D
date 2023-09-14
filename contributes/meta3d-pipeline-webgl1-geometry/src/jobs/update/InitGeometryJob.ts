import { execFunc as execFuncType } from "meta3d-engine-core-sceneview-protocol/src/contribute/work/PipelineContributeType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { getAllGeometryIndices, getGL, getState, setState } from "../Utils"
import { states } from "meta3d-pipeline-webgl1-geometry-protocol/src/StateType"
import { initGeometry } from "../InitGeometryUtils"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc, meta3dEngineCoreExtensionProtocolName }) => {
	let states = getStatesFunc<states>(meta3dState)
	let { mostService, webgl1Service, engineCoreService, immutableService, vbo } = getState(states)

	return mostService.callFunc(() => {
		console.log("init geometry job");

		let verticesVBOMap = getExn(vbo.verticesVBOMap)
		let indicesVBOMap = getExn(vbo.indicesVBOMap)

		let [newVerticesVBOMap, newIndicesVBOMap] = initGeometry([webgl1Service, engineCoreService, immutableService],
			api.getExtensionState(meta3dState, meta3dEngineCoreExtensionProtocolName),
			getGL(states), verticesVBOMap, indicesVBOMap, getAllGeometryIndices(states))

		return setStatesFunc<states>(
			meta3dState,
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