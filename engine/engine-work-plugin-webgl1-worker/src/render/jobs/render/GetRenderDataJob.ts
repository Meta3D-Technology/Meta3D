import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType"
import { getState } from "../../Utils"
import { states } from "engine-work-plugin-webgl1-worker-render-protocol"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, webgl1WorkerSyncService } = getState(states)

	return mostService.map(({
		camera,
		renderDataBufferData
	}) => {
		console.log("get init render data job webgl worker exec on worker thread")

		return setStatesFunc<states>(
			engineCoreState,
			{
				...states,
				"engine-work-plugin-webgl1-worker-render": {
					...getState(states),
					viewMatrix: camera.viewMatrix,
					pMatrix: camera.pMatrix,
					renderDataBufferTypeArray: renderDataBufferData.typeArray,
					renderGameObjectsCount: renderDataBufferData.renderGameObjectsCount
				}
			}
		)
	}, webgl1WorkerSyncService.getRenderData(mostService))
}