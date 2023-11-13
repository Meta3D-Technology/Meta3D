import { service } from "meta3d-three-protocol/src/service/ServiceType"
import { state } from "meta3d-three-protocol/src/state/StateType"
import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D } from "meta3d-type"

export let getExtensionService: getExtensionServiceMeta3D<service> = (api) => {
    return {
        converter: (meta3dState) => api.getExtensionService(meta3dState, "meta3d-scenegraph-converter-three-protocol"),
        api: (meta3dState) => api.getExtensionService(meta3dState, "meta3d-three-api-protocol"),
    }
}

export let createExtensionState: createExtensionStateMeta3D<state> = () => {
    return null
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
    return {
    }
}
