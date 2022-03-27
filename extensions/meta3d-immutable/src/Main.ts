import { service } from "meta3d-immutable-protocol/src/service/ServiceType"
import { dependentExtensionNameMap } from "meta3d-immutable-protocol/src/service/DependentExtensionType"
import { state } from "meta3d-immutable-protocol/src/state/StateType"
import { createExtensionState as createExtensionStateMeta3D, getExtensionService as getExtensionServiceMeta3D } from "meta3d-type/src/Index"
import { Map } from "immutable"

export let getExtensionService: getExtensionServiceMeta3D<dependentExtensionNameMap, service> = (_api, _dependentExtensionNameMap) => {
    return {
        createMap: () => Map(),
        mapSet: (map, key, value) => map.set(key, value),
        mapGet: (map, key) => map.get(key)
    }
}

export let createExtensionState: createExtensionStateMeta3D<state> = () => {
    return {}
}
