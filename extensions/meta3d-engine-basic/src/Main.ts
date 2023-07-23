import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState } from "meta3d-type"
import { state } from "meta3d-engine-basic-protocol/src/state/StateType"
import { service } from "meta3d-engine-basic-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { pipelineContribute } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { state as rootState, states as rootStates } from "meta3d-pipeline-root-protocol/src/StateType";
import { config as rootConfig } from "meta3d-pipeline-root-protocol/src/ConfigType";

export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
		return {
			prepare: (meta3dState: meta3dState, isDebug) => {
				let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, "meta3d-engine-core-protocol")

				let engineCoreService = api.getExtensionService<engineCoreService>(
					meta3dState,
					"meta3d-engine-core-protocol"
				)


				let { setIsDebug, registerPipeline } = engineCoreService

				engineCoreState = setIsDebug(engineCoreState, isDebug)




				engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<rootConfig, rootState>>(meta3dState,  "meta3d-pipeline-root-protocol")
				)


				meta3dState =
					api.setExtensionState(
						meta3dState,
						"meta3d-engine-core-protocol",
						engineCoreState
					)

				return meta3dState
			}
		}
	}

export let createExtensionState: createExtensionStateMeta3D<
	state
> = () => {
	return null
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
	return {
	}
}
