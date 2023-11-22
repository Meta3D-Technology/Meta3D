import { service } from "meta3d-immutable-protocol/src/service/ServiceType"
import { state } from "meta3d-immutable-protocol/src/state/StateType"
import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D } from "meta3d-type"
import { List, Map } from "immutable"

export let getExtensionService: getExtensionServiceMeta3D<service> = (_api) => {
    return {
        createList: () => List(),
        createMap: () => Map(),
    }
}

export let createExtensionState: createExtensionStateMeta3D<state> = () => {
    return null
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
    return {
    }
}
