import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType";
import { getMaxRenderGameObjectCount, getState, setState } from "../Utils";
import { states } from "meta3d-work-plugin-renderdatabuffer-protocol";

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, renderDataBufferService, workPluginWhichHasMaxRenderGameObjectCountName } = getState(states)

	return mostService.callFunc(() => {
		console.log("create render data buffer job")

		return setStatesFunc<states>(
			engineCoreState,
			setState(states,
				{
					...getState(states),
					renderDataBufferTypeArray: renderDataBufferService.createRenderDataBufferTypeArray(getMaxRenderGameObjectCount(states, workPluginWhichHasMaxRenderGameObjectCountName))
				}
			)
		)
	})
}