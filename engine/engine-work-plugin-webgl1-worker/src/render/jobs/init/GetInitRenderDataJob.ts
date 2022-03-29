import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType"
import { getState } from "../../Utils"
import { states } from "engine-work-plugin-webgl1-worker-render-protocol"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, webgl1WorkerSyncService } = getState(states)

	return mostService.map(({
		offscreenCanvas,
		allMaterialIndices,
		allGeometryIndices,
		transformBuffer,
		pbrMaterialBuffer,
		geometryBuffer,
		transformCount,
		geometryPointCount,
		geometryCount,
		pbrMaterialCount
	}) => {
		console.log("get init render data job webgl worker exec on worker thread")

		return setStatesFunc<states>(
			engineCoreState,
			{
				...states,
				"engine-work-plugin-webgl1-worker-render": {
					...getState(states),
					canvas: offscreenCanvas,
					allGeometryIndices: allGeometryIndices,
					allMaterialIndices: allMaterialIndices,
					transformCount: transformCount,
					geometryCount: geometryCount,
					geometryPointCount: geometryPointCount,
					pbrMaterialCount: pbrMaterialCount,
					transformBuffer: transformBuffer,
					geometryBuffer: geometryBuffer,
					pbrMaterialBuffer: pbrMaterialBuffer
				}
			}
		)
	}, webgl1WorkerSyncService.getInitRenderData(mostService))
}