import { state as meta3dState, getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, api } from "meta3d-type"
import { service as engineWholeService } from "meta3d-engine-whole-sceneview-protocol/src/service/ServiceType"
import { service as engineWholeGameViewService } from "meta3d-engine-whole-gameview-protocol/src/service/ServiceType"

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