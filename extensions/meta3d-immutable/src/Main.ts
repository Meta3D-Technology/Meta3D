import { service } from "meta3d-immutable-protocol/src/service/ServiceType"
import { dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap } from "./DependentMapType"
import { state } from "meta3d-immutable-protocol/src/state/StateType"
import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D } from "meta3d-type"
import { Map } from "immutable"

export let getExtensionService: getExtensionServiceMeta3D<dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap, service> = (_api, [_dependentExtensionProtocolNameMap, _dependentContributeProtocolNameMap]) => {
    return {
        createMap: () => Map(),
        mapSet: (map, key, value) => map.set(key, value),
        mapGet: (map, key) => map.get(key)
    }
}

export let createExtensionState: createExtensionStateMeta3D<state> = () => {
    return null
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
    return {
    }
}
