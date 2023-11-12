import { state as meta3dState, getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, api } from "meta3d-type"
import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"

export let activeFirstBasicCameraView = (meta3dState: meta3dState,
    engineSceneService: engineSceneService
): meta3dState => {
    let basicCameraViewGameObjects = engineSceneService.gameObject.getAllGameObjects(meta3dState)
        .filter(gameObject => engineSceneService.gameObject.hasBasicCameraView(meta3dState, gameObject))

    if (basicCameraViewGameObjects.length == 0) {
        throw new Error("error")
    }

    let basicCameraViewGameObject = basicCameraViewGameObjects[0]

    meta3dState = engineSceneService.basicCameraView.active(
        meta3dState,
        engineSceneService.gameObject.getBasicCameraView(meta3dState, basicCameraViewGameObject)
    )

    return meta3dState
}