import { execFunc as execFuncType } from "../../Type";
import { getState } from "../Utils";
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";
import { initGeometryUtils } from "engine-work-plugin-webgl1-utils/src/utils/InitGeometryJobUtils";
import { states } from "engine-work-plugin-webgl1-protocol";
import { componentName, geometry } from "../../../../../component_protocols/meta3d-component-geometry-protocol/src/Index";

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, webgl1Service, engineCoreService, gl, vbo } = getState(states)

	return mostService.callFunc(() => {
		console.log("init webgl job init geometry job exec");

		gl = getExn(gl);
		let verticesVBOMap = getExn(vbo.verticesVBOMap);
		let indicesVBOMap = getExn(vbo.indicesVBOMap);

		let usedGeometryContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, componentName)
		let allGeometriesIndices = engineCoreService.getAllComponents<geometry>(usedGeometryContribute)

		let [newVerticesVBOMap, newIndicesVBOMap] = initGeometryUtils(engineCoreState, [webgl1Service, engineCoreService], gl, verticesVBOMap, indicesVBOMap, allGeometriesIndices,);

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