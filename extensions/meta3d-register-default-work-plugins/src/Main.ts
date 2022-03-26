import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D } from "meta3d-type/src/Index"
import { dependentExtensionNameMap } from "meta3d-register-default-work-plugins-protocol/src/service/DependentExtensionType"
import { service } from "meta3d-register-default-work-plugins-protocol/src/service/ServiceType"
import { state } from "meta3d-register-default-work-plugins-protocol/src/state/StateType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { getWorkPluginContribute } from "meta3d-work-plugin-root"

export let getExtensionService: getExtensionServiceMeta3D<
	dependentExtensionNameMap,
	service
> = (api, { meta3dEngineCoreExtensionName, meta3dBsMostExtensionName }) => {
	return {
		register: (engineCoreState, meta3dState) => {
			let { registerWorkPlugin } = api.getExtensionService<engineCoreService>(meta3dState, meta3dEngineCoreExtensionName)
			let mostService: mostService = api.getExtensionService(meta3dState, meta3dBsMostExtensionName)

			engineCoreState =
				registerWorkPlugin(
					engineCoreState,
					getWorkPluginContribute(mostService)
				)

			return engineCoreState
		}
	}
}

export let createExtensionState: createExtensionStateMeta3D<
	state
> = () => {
	return null
}
