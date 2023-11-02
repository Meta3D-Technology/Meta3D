import { service } from "meta3d-export-scene-protocol/src/service/ServiceType"
import { state } from "meta3d-export-scene-protocol/src/state/StateType"
import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D } from "meta3d-type"
import { GLTFExporter, setThreeAPI } from "./three/GLTFExporter"
import { service as converterGameViewService } from "meta3d-scenegraph-converter-three-gameview-protocol/src/service/ServiceType"
import { service as threeAPIService } from "meta3d-three-api-protocol/src/service/ServiceType"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils";

export let getExtensionService: getExtensionServiceMeta3D<service> = (api) => {
    return {
        export: ([onFinishFunc, onErrorFunc], meta3dState) => {
            let { perspectiveCamera, scene } =
                api.getExtensionService<converterGameViewService>(meta3dState, "meta3d-scenegraph-converter-three-gameview-protocol").convert(meta3dState)

            let scene_ = getExn(scene)

            // if (!isNullable(perspectiveCamera)) {
            //     scene_.add(getExn(perspectiveCamera))
            // }


            let threeAPIService = api.getExtensionService<threeAPIService>(meta3dState, "meta3d-three-api-protocol")

            setThreeAPI(threeAPIService)

            new GLTFExporter().parse(
                scene_,
                onFinishFunc as (gltf: ArrayBuffer | { [key: string]: any }) => void,
                onErrorFunc,
                {
                    binary: true
                }
            )
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
