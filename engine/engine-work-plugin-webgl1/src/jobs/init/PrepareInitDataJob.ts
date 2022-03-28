import { execFunc as execFuncType } from "../../Type"
import { getState, setState } from "../Utils"
import { states } from "engine-work-plugin-webgl1-protocol"
import { componentName, geometry } from "meta3d-component-geometry-protocol"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, engineCoreService } = getState(states)

	return mostService.callFunc(() => {
		console.log("prepare init data job");
		
		return setStatesFunc<states>(
			engineCoreState,
			setState(states, {
				...getState(states),
				allGeometryIndices: engineCoreService.getAllComponents<geometry>(engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, componentName))
			})
		)
	})
}