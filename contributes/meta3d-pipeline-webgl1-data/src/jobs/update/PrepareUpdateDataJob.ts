import { execFunc as execFuncType } from "meta3d-engine-core-sceneview-protocol/src/contribute/work/PipelineContributeType"
import { state as engineCoreState } from "meta3d-engine-core-sceneview-protocol/src/state/StateType"
import { getState, setState } from "../Utils"
import { states } from "meta3d-pipeline-webgl1-data-protocol/src/StateType"
import { componentName as geoemtryComponentName, geometry } from "meta3d-component-geometry-protocol"
import { componentName as pbrMaterialComponentName, pbrMaterial } from "meta3d-component-pbrmaterial-protocol"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc, meta3dEngineCoreExtensionProtocolName }) => {
	let states = getStatesFunc<states>(meta3dState)
	let { mostService, engineCoreService } = getState(states)

	return mostService.callFunc(() => {
		console.log("prepare update data job");

		let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, meta3dEngineCoreExtensionProtocolName)

		return setStatesFunc<states>(
			meta3dState,
			setState(states, {
				...getState(states),
				allGeometryIndices: engineCoreService.getAllComponents<geometry>(engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, geoemtryComponentName)),
				allMaterialIndices: engineCoreService.getAllComponents<pbrMaterial>(engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, pbrMaterialComponentName)),
			})
		)
	})
}