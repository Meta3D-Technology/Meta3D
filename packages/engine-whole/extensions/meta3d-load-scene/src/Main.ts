import { service } from "meta3d-load-scene-protocol/src/service/ServiceType"
import { state } from "meta3d-load-scene-protocol/src/state/StateType"
import { state as meta3dState, getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, api } from "meta3d-type"
import { service as threeService } from "meta3d-three-protocol/src/service/ServiceType"
// import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
// import { activeFirstBasicCameraView } from "meta3d-load-scene-utils/src/Main"
import { service as assetService } from "meta3d-asset-protocol/src/service/ServiceType"

export let getExtensionService: getExtensionServiceMeta3D<service> = (api) => {
    return {
        loadScene: (meta3dState, sceneGLB) => {
            let { loadGlb } = api.nullable.getExn(api.getPackageService<assetService>(meta3dState, "meta3d-load-glb-protocol"))

            return loadGlb(meta3dState, sceneGLB)
                .then((gltf) => {
                    let data = api.nullable.getExn(api.getPackageService<threeService>(meta3dState, "meta3d-three-protocol")).converter(meta3dState).import(meta3dState, gltf.scene)
                    meta3dState = data[0]


                    // meta3dState = activeFirstBasicCameraView(meta3dState, api.getExtensionService<engineSceneService>(meta3dState, "meta3d-engine-scene-protocol"))

                    return meta3dState
                })
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
