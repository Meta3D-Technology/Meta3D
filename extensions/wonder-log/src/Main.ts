import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D } from "meta3d-type/src/Index"
import { state } from "wonder-log-protocol/src/state/StateType"
import { service } from "wonder-log-protocol/src/service/ServiceType"
import { dependentExtensionNameMap } from "wonder-log-protocol/src/service/DependentExtensionType"


export let getExtensionService: getExtensionServiceMeta3D<
	dependentExtensionNameMap,
	service
> = (_api, _dependentExtensionNameMap) => {
	return {
		log: () => {
			console.log("wonder-log extension->log")
		}
	}
}

export let createExtensionState: createExtensionStateMeta3D<
	state
> = () => {
	return null
}
