import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D } from "meta3d-type"
import { state } from "meta3d-extension-test2-protocol/src/state/StateType"
import { service } from "meta3d-extension-test2-protocol/src/service/ServiceType"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-extension-test2-protocol/src/service/DependentMapType"
import { service as test1Service } from "meta3d-extension-test1-protocol/src/service/ServiceType"
import { state as test1State } from "meta3d-extension-test1-protocol/src/state/StateType"

export let getExtensionService: getExtensionServiceMeta3D<
	dependentExtensionNameMap,
	dependentContributeNameMap,
	service
> = (api, [{ meta3dTest1ExtensionName }, _]) => {
	return {
		invokeExtensionTest1: (meta3dState) => {
			let { log, registerInfo } = api.getExtensionService<test1Service>(meta3dState, meta3dTest1ExtensionName)

			let extensionTest1State = api.getExtensionState<test1State>(meta3dState, meta3dTest1ExtensionName)

			extensionTest1State = registerInfo(extensionTest1State, meta3dState)

			log(extensionTest1State)
		},
	}
}

export let createExtensionState: createExtensionStateMeta3D<
	state
> = () => {
	return null
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionName) => {
	return {
	}
}
