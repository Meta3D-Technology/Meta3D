import { execFunc as execFuncType } from "meta3d-engine-core-sceneview-protocol/src/contribute/work/PipelineContributeType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { getAllMaterialIndices, getGL, getState, setState } from "../Utils"
import { states } from "meta3d-pipeline-webgl1-material-protocol/src/StateType"
import { initMaterial } from "../InitMaterialUtils"

export let execFunc: execFuncType = (meta3dState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(meta3dState)
	let { mostService, webgl1Service, immutableService, material } = getState(states)

	return mostService.callFunc(() => {
		console.log("init material job");

		let programMap = getExn(material.programMap)

		let newProgramMap = initMaterial([webgl1Service, immutableService], getGL(states), programMap, getAllMaterialIndices(states))


		return setStatesFunc<states>(
			meta3dState,
			setState(states, {
				...getState(states),
				material: {
					programMap: newProgramMap
				}
			})
		)
	})
}