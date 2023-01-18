import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState } from "meta3d-type"
import { state } from "meta3d-engine-basic-protocol/src/state/StateType"
import { service } from "meta3d-engine-basic-protocol/src/service/ServiceType"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-engine-basic-protocol/src/service/DependentMapType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { workPluginContribute } from "meta3d-engine-core-protocol/src/contribute/work/WorkPluginContributeType"
import { state as rootState, states as rootStates } from "meta3d-work-plugin-root-protocol/src/StateType";
import { config as rootConfig } from "meta3d-work-plugin-root-protocol/src/ConfigType";

export let getExtensionService: getExtensionServiceMeta3D<
	dependentExtensionNameMap,
	dependentContributeNameMap,
	service
> = (api, [{
	meta3dEngineCoreExtensionName,
}, {
	meta3dWorkPluginRootContributeName
}]) => {
		return {
			prepare: (meta3dState: meta3dState, isDebug) => {
				let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, meta3dEngineCoreExtensionName)

				let engineCoreService = api.getExtensionService<engineCoreService>(
					meta3dState,
					meta3dEngineCoreExtensionName
				)


				let { setIsDebug, registerWorkPlugin } = engineCoreService

				engineCoreState = setIsDebug(engineCoreState, isDebug)




				engineCoreState = registerWorkPlugin(engineCoreState, api.getContribute<workPluginContribute<rootConfig, rootState>>(meta3dState, meta3dWorkPluginRootContributeName)
				)


				meta3dState =
					api.setExtensionState(
						meta3dState,
						meta3dEngineCoreExtensionName,
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
