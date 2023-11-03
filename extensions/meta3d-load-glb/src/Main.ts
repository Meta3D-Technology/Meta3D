import { service } from "meta3d-load-glb-protocol/src/service/ServiceType"
import { state } from "meta3d-load-glb-protocol/src/state/StateType"
import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, api } from "meta3d-type"
import { service as threeAPIService } from "meta3d-three-api-protocol/src/service/ServiceType"
import { GLTFLoader, setThreeAPI } from "./three/GLTFLoader"
import { DefaultLoadingManager } from "./three/LoadingManager"
import { DRACOLoader } from "./three/DRACOLoader"
import { KTX2Loader } from "./three/KTX2Loader"
import { MeshoptDecoder } from "./three/meshopt_decoder.module"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"
import { state as meta3dState } from "meta3d-type"
import type { WebGLRenderer } from "three"

let _createRendererOnlyOnce = (meta3dState: meta3dState, api: api, threeAPIService: threeAPIService) => {
    let state = api.getExtensionState<state>(meta3dState, "meta3d-load-glb-protocol")

    let renderer = state.renderer

    if (isNullable(renderer)) {
        renderer = new threeAPIService.WebGLRenderer()

        meta3dState = api.setExtensionState(meta3dState, "meta3d-load-glb-protocol", {
            ...state,
            renderer
        })
    }
    else {
        renderer = getExn(renderer)
    }

    return [meta3dState, renderer]
}

export let getExtensionService: getExtensionServiceMeta3D<service> = (api) => {
    return {
        loadGlb: (meta3dState, glb) => {
            let threeAPIService = api.getExtensionService<threeAPIService>(meta3dState, "meta3d-three-api-protocol")

            setThreeAPI(threeAPIService)

            return new Promise((resolve, reject) => {
                let dracoLoader = new DRACOLoader()
                dracoLoader.setDecoderPath("static/three/draco/gltf/")

                let data = _createRendererOnlyOnce(meta3dState, api, threeAPIService)
                meta3dState = data[0] as meta3dState
                let renderer = data[1] as WebGLRenderer

                let ktx2Loader = new KTX2Loader()
                    .setTranscoderPath("static/three/basis/")
                    .detectSupport(renderer);

                new GLTFLoader(
                    DefaultLoadingManager as any,
                ).setDRACOLoader(dracoLoader)
                    .setMeshoptDecoder(MeshoptDecoder)
                    .setKTX2Loader(ktx2Loader)
                    .parse(
                        glb,
                        "",
                        (gltf) => {
                            resolve(gltf)
                        },
                        (event) => reject(event)
                    )
            })


        }
    }
}

export let createExtensionState: createExtensionStateMeta3D<state> = () => {
    return {
        renderer: null
    }
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
    return {
    }
}
