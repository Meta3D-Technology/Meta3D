import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D } from "meta3d-type"
import { state } from "meta3d-editor-run-engine-protocol/src/state/StateType"
import { service } from "meta3d-editor-run-engine-protocol/src/service/ServiceType"
import { getExtensionServiceUtils } from "meta3d-editor-webgl1-three-run-engine-utils/src/Main"

export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
	return getExtensionServiceUtils(api, "meta3d-engine-whole-protocol")
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
