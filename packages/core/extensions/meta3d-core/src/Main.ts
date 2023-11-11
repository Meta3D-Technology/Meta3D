import { service } from "meta3d-core-protocol/src/service/ServiceType"
import { state } from "meta3d-core-protocol/src/state/StateType"
import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D } from "meta3d-type"
import { service as engineBasicService } from "meta3d-engine-basic-protocol/src/service/ServiceType"

export let getExtensionService: getExtensionServiceMeta3D<service> = (api) => {
    return {
        engineCore: (meta3dState) => api.getExtensionService(meta3dState, "meta3d-engine-core-protocol"),
        most: (meta3dState) => api.getExtensionService(meta3dState, "meta3d-bs-most-protocol"),
        prepare: (meta3dState, isDebug) => api.getExtensionService<engineBasicService>(meta3dState, "meta3d-engine-basic-protocol").prepare(meta3dState, isDebug)
    }
}

export let createExtensionState: createExtensionStateMeta3D<state> = () => {
    return null
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
    return {
    }
}
