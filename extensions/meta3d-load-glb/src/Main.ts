import { service } from "meta3d-load-glb-protocol/src/service/ServiceType"
import { state } from "meta3d-load-glb-protocol/src/state/StateType"
import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, api } from "meta3d-type"
import { loadGlb } from "meta3d-load-scene-utils/src/Main"

export let getExtensionService: getExtensionServiceMeta3D<service> = (api) => {
    return {
        loadGlb: (meta3dState, glb) => {
            return loadGlb(meta3dState, api, glb)
        }
    }
}

export let createExtensionState: createExtensionStateMeta3D<state> = () => {
    return null
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
    return {
    }
}
