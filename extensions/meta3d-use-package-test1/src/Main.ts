import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState } from "meta3d-type"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-use-package-test1-protocol/src/service/DependentMapType"
import { state } from "meta3d-use-package-test1-protocol/src/state/StateType"
import { service } from "meta3d-use-package-test1-protocol/src/service/ServiceType"
import { service as test2Service } from "meta3d-extension-test2-protocol/src/service/ServiceType"

export let getExtensionService: getExtensionServiceMeta3D<
	dependentExtensionNameMap,
	dependentContributeNameMap,
	service
> = (api, [{ meta3dTest2ExtensionName }, _]) => {
	return {
		run: (meta3dState: meta3dState) => {
			let { invokeExtensionTest1 } = api.getExtensionService<test2Service>(meta3dState, meta3dTest2ExtensionName)

			invokeExtensionTest1(meta3dState)
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
		onRegister: (meta3dState, service) => {
			// console.log("meta3d-use-package-test1 onRegister")
			return meta3dState
		},
		onStart: (meta3dState, service, configData) => {
			// console.log("meta3d-use-package-test1 onStart")

			service.run(meta3dState)
		}
	}
}
