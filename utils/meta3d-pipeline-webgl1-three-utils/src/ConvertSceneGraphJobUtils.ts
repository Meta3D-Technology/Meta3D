import { state as meta3dState, api } from "meta3d-type"
import { service as renderService } from "meta3d-editor-sceneview-render-protocol/src/service/ServiceType"
import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"

export let buildGetAllGameObjectsFunc = (api: api) => {
    return (meta3dState: meta3dState) => {
        let renderService = api.getPackageService<renderService>(meta3dState, "meta3d-editor-sceneview-render-protocol")

        let allGameObjects = getExn(
            api.getPackageService<engineSceneService>(meta3dState, "meta3d-engine-scene-protocol")
        ).gameObject.getAllGameObjects(meta3dState)

        if (isNullable(renderService)) {
            return allGameObjects
        }

        let arcballCameraControllerGameObject = getExn(getExn(renderService).getArcballCameraControllerGameObject(meta3dState))

        return allGameObjects.filter(gameObject => {
            return gameObject != arcballCameraControllerGameObject
        })
    }
}