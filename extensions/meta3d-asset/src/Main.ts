import { service } from "meta3d-asset-protocol/src/service/ServiceType"
import { state } from "meta3d-asset-protocol/src/state/StateType"
import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, api } from "meta3d-type"
import { List } from "immutable"

export let getExtensionService: getExtensionServiceMeta3D<service> = (api) => {
    return {
        addGLBAsset: (meta3dState, gltf, glbId) => {
            let state = api.getExtensionState<state>(meta3dState, "meta3d-asset-protocol")

            return api.setExtensionState(meta3dState, "meta3d-asset-protocol", {
                ...state,
                allGLBAssets: state.allGLBAssets.push([glbId, gltf])
            })
        },
        getAllGLBAssets: (meta3dState) => {
            return api.getExtensionState<state>(meta3dState, "meta3d-asset-protocol").allGLBAssets
        }
    }
}

export let createExtensionState: createExtensionStateMeta3D<state> = () => {
    return {
        allGLBAssets: List()
    }
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
    return {
    }
}
