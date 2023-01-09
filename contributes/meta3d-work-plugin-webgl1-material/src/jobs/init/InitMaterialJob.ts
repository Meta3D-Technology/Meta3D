import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/WorkPluginContributeType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { getAllMaterialIndices, getGL, getState, setState } from "../Utils"
import { states } from "meta3d-work-plugin-webgl1-material-protocol/src/StateType"
import { initMaterial } from "../InitMaterialUtils"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, webgl1Service, immutableService, material, workPluginWhichHasAllMaterialIndicesName } = getState(states)

	return mostService.callFunc(() => {
		console.log("init material job");

		let programMap = getExn(material.programMap)

		let newProgramMap = initMaterial([webgl1Service, immutableService], getGL(states), programMap, getAllMaterialIndices(states, workPluginWhichHasAllMaterialIndicesName))


		return setStatesFunc<states>(
			engineCoreState,
			setState(states, {
				...getState(states),
				material: {
					programMap: newProgramMap
				}
			})
		)
	})
}