import { state as meta3dState, getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, api } from "meta3d-type"
import { service as threeAPIService } from "meta3d-three-api-protocol/src/service/ServiceType"
import { GLTFLoader, setThreeAPI } from "./three/GLTFLoader"
import { DefaultLoadingManager } from "./three/LoadingManager"
import { service as engineWholeService } from "meta3d-engine-whole-sceneview-protocol/src/service/ServiceType"
import { service as engineWholeGameViewService } from "meta3d-engine-whole-gameview-protocol/src/service/ServiceType"
import type { GLTF } from "./three/GLTFLoader"

export let loadGlb = (meta3dState: meta3dState, api: api, glb: ArrayBuffer): Promise<GLTF> => {
    let threeAPIService = api.getExtensionService<threeAPIService>(meta3dState, "meta3d-three-api-protocol")

    setThreeAPI(threeAPIService)

    return new Promise((resolve, reject) => {
        new GLTFLoader(
            DefaultLoadingManager as any,
        ).parse(
            glb,
            "",
            (gltf) => {
                resolve(gltf)
            },
            (event) => reject(event)
        )
    })

}

export let activeFirstBasicCameraView = (meta3dState: meta3dState,
    { scene }: engineWholeService | engineWholeGameViewService
): meta3dState => {
    let basicCameraViewGameObjects = scene.gameObject.getAllGameObjects(meta3dState)
        .filter(gameObject => scene.gameObject.hasBasicCameraView(meta3dState, gameObject))

    if (basicCameraViewGameObjects.length == 0) {
        throw new Error("error")
    }

    let basicCameraViewGameObject = basicCameraViewGameObjects[0]

    meta3dState = scene.basicCameraView.active(
        meta3dState,
        scene.gameObject.getBasicCameraView(meta3dState, basicCameraViewGameObject)
    )

    return meta3dState
}