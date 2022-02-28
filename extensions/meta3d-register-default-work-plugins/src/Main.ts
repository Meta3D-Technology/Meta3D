import { getExtensionService as getExtensionServiceMeta3d, createExtensionState as createExtensionStateMeta3d } from "meta3d-type/src/Index"
import { dependentExtensionNameMap } from "meta3d-register-default-work-plugins-protocol/src/service/DependentExtensionType"
import { service } from "meta3d-register-default-work-plugins-protocol/src/service/ServiceType"
import { state } from "meta3d-register-default-work-plugins-protocol/src/state/StateType"
import { service as meta3dEngineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { service as meta3dMostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { getWorkPluginContribute } from "meta3d-work-plugin-root"

export let getExtensionService: getExtensionServiceMeta3d<
	dependentExtensionNameMap,
	service
> = (api, { meta3dEngineCoreExtensionName, meta3dBsMostExtensionName }) => {
	return {
		register: (engineCoreState, meta3dState) => {
			let { registerWorkPlugin } = api.getServiceExn<meta3dEngineCoreService>(meta3dState, meta3dEngineCoreExtensionName)
			let meta3dMostService: meta3dMostService = api.getServiceExn(meta3dState, meta3dBsMostExtensionName)

			engineCoreState =
				registerWorkPlugin(
					engineCoreState,
					getWorkPluginContribute(meta3dMostService)
				)

			return engineCoreState
		}
	}
}

export let createExtensionState: createExtensionStateMeta3d<
	state
> = () => {
	return null
}
