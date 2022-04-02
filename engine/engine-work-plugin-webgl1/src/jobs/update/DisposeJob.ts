import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType"
import { getState, setState } from "../Utils"
import { states } from "engine-work-plugin-webgl1-protocol"

function _disposeComponents() {
	return 1 as any
}

function _disposeGameObjects() {
	return 1 as any
}

TODO move out
function _disposeGeometryVBO() {
	return 1 as any
}

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, engineCoreService } = getState(states)

	return mostService.callFunc(() => {
		console.log("dispose job");

		TODO finish
	})
}