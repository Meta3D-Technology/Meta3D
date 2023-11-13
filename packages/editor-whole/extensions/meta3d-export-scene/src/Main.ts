import { service } from "meta3d-export-scene-protocol/src/service/ServiceType"
import { state } from "meta3d-export-scene-protocol/src/state/StateType"
import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D } from "meta3d-type"
import { GLTFExporter, setThreeAPI } from "./three/GLTFExporter"
import { service as threeService } from "meta3d-three-protocol/src/service/ServiceType"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils";
import { buildGetAllGameObjectsFunc } from "meta3d-pipeline-webgl1-three-utils/src/ConvertSceneGraphJobUtils"
import { state as converterState } from "meta3d-scenegraph-converter-three-protocol/src/state/StateType"

export let getExtensionService: getExtensionServiceMeta3D<service> = (api) => {
    return {
        export: ([onFinishFunc, onErrorFunc], meta3dState) => {
            let threeService = getExn(api.getPackageService<threeService>(meta3dState, "meta3d-three-protocol"))

            meta3dState = threeService.converter(meta3dState).convert(buildGetAllGameObjectsFunc(api), meta3dState)
            let { perspectiveCamera, scene } = api.getExtensionState<converterState>(meta3dState,
                "meta3d-scenegraph-converter-three-protocol")

            let scene_ = getExn(scene)

            // if (!isNullable(perspectiveCamera)) {
            //     scene_.add(getExn(perspectiveCamera))
            // }


            let threeAPIService = threeService.api(meta3dState)

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
