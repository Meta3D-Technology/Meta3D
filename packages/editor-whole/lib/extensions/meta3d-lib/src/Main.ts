import { service } from "meta3d-lib-protocol/src/service/ServiceType"
import { state } from "meta3d-lib-protocol/src/state/StateType"
import { state as meta3dState, getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, api } from "meta3d-type"
import { service as filesaveService } from "meta3d-filesaver-protocol/src/service/ServiceType"
import { service as jszipService } from "meta3d-jszip-protocol/src/service/ServiceType"

export let getExtensionService: getExtensionServiceMeta3D<service> = (api) => {
    return {
        filesave: (meta3dState) => {
            return api.getExtensionService<filesaveService>(meta3dState, "meta3d-filesaver-protocol")
        },
        jszip: (meta3dState) => {
            return api.getExtensionService<jszipService>(meta3dState, "meta3d-jszip-protocol")
        },
    }
}

export let createExtensionState: createExtensionStateMeta3D<state> = () => {
    return null
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
    return {
    }
}
