import { service } from "meta3d-load-scene-protocol/src/service/ServiceType"
import { state } from "meta3d-load-scene-protocol/src/state/StateType"
import { state as meta3dState, getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, api } from "meta3d-type"
import { service as converterGameViewService } from "meta3d-scenegraph-converter-three-gameview-protocol/src/service/ServiceType"
import { service as engineWholeGameViewService } from "meta3d-engine-whole-gameview-protocol/src/service/ServiceType"
import { loadGlb, activeFirstBasicCameraView } from "meta3d-load-scene-utils/src/Main"

export let getExtensionService: getExtensionServiceMeta3D<service> = (api) => {
    return {
        loadScene: (meta3dState, sceneGLB) => {
            return loadGlb(meta3dState, api, sceneGLB)
                .then((gltf) => {
                    meta3dState = api.getExtensionService<converterGameViewService>(meta3dState, "meta3d-scenegraph-converter-three-gameview-protocol").import(meta3dState, gltf.scene)


                    // TODO use plugin for GLTFExporter, GLTFLoader to support arcballCameraController

                    meta3dState = activeFirstBasicCameraView(meta3dState, api.getExtensionService<engineWholeGameViewService>(meta3dState, "meta3d-engine-whole-gameview-protocol"))

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
