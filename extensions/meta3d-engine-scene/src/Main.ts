import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { state } from "meta3d-engine-scene-protocol/src/state/StateType"
import { service } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { getExtensionServiceUtils } from "meta3d-engine-scene-utils/src/Main"


export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
	return getExtensionServiceUtils(api, "met3d-engine-core-protocol")
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
