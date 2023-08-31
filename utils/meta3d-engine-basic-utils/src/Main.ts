import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { service } from "meta3d-engine-basic-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { pipelineContribute } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { state as rootState, states as rootStates } from "meta3d-pipeline-root-protocol/src/StateType";
import { config as rootConfig } from "meta3d-pipeline-root-protocol/src/ConfigType";

export let getExtensionServiceUtils = (api: api, engineCoreProtocolName: string): service => {
	return {
		prepare: (meta3dState: meta3dState, isDebug) => {
			let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, engineCoreProtocolName)

			let engineCoreService = api.getExtensionService<engineCoreService>(
				meta3dState,
				engineCoreProtocolName
			)


			let { setIsDebug, registerPipeline } = engineCoreService

			engineCoreState = setIsDebug(engineCoreState, isDebug)




			engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<rootConfig, rootState>>(meta3dState, "meta3d-pipeline-root-protocol")
			)


			meta3dState =
				api.setExtensionState(
					meta3dState,
					engineCoreProtocolName,
					engineCoreState
				)

			return meta3dState
		}
	}
}