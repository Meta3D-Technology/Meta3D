import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D } from "meta3d-type"
import { state } from "meta3d-editor-protocol/src/state/StateType"
import { service } from "meta3d-editor-protocol/src/service/ServiceType"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-editor-protocol/src/service/DependentMapType"
import { service as test1Service } from "meta3d-extension-test1-protocol/src/service/ServiceType"
import { state as test1State } from "meta3d-extension-test1-protocol/src/state/StateType"

export let getExtensionService: getExtensionServiceMeta3D<
	dependentExtensionNameMap,
	dependentContributeNameMap,
	service
> = (api, [{ meta3dTest1ExtensionName }, _dependentContributeNameMap]) => {
	return {
		run: (meta3dState) => {
			let test1State = api.getExtensionState<test1State>(meta3dState, meta3dTest1ExtensionName)


			let { log, registerInfo } = api.getExtensionService<test1Service>(meta3dState, meta3dTest1ExtensionName)

			test1State = registerInfo(test1State, meta3dState)

			log(test1State)



			meta3dState = api.setExtensionState(meta3dState, meta3dTest1ExtensionName, test1State)

			return meta3dState
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
		onRegister: (meta3dState, service) => {
			console.log("meta3d-editor onRegister")
			return meta3dState
		},
		onStart: (meta3dState, service) => {
			console.log("meta3d-editor onStart")
			return service.run(meta3dState)
		}
	}
}
