import { service } from "meta3d-immutable-protocol/src/service/ServiceType"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-immutable-protocol/src/service/DependentMapType"
import { state } from "meta3d-immutable-protocol/src/state/StateType"
import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D } from "meta3d-type"
import { Map } from "immutable"

export let getExtensionService: getExtensionServiceMeta3D<dependentExtensionNameMap, dependentContributeNameMap, service> = (_api, [_dependentExtensionNameMap, _dependentContributeNameMap]) => {
    return {
        createMap: () => Map(),
        mapSet: (map, key, value) => map.set(key, value),
        mapGet: (map, key) => map.get(key)
    }
}

export let createExtensionState: createExtensionStateMeta3D<state> = () => {
    return {}
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionName) => {
    return {
    }
}
