import { state as meta3dState } from "meta3d-type"
import { gameObject } from "meta3d-gameobject-protocol"
import { service as engineWholeService } from "meta3d-engine-whole-sceneview-protocol/src/service/ServiceType"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"

export let disposeGameObjectAndChildren =<engineWholeService_ extends engineWholeService> (meta3dState: meta3dState,
    engineWholeService: engineWholeService_,
    gameObject: gameObject): meta3dState => {
    let { getChildren, getGameObjects } = engineWholeService.scene.transform
    let { getTransform, disposeGameObjects } = engineWholeService.scene.gameObject

    let _getGameObjects = (result: Array<gameObject>, meta3dState: meta3dState, gameObject: gameObject): Array<gameObject> => {
        let children = getChildren(meta3dState, getTransform(meta3dState, gameObject))

        if (isNullable(children) || getExn(children).length == 0) {
            return result
        }

        return getExn(children).reduce((result, child) => {
            let gameObject = getGameObjects(meta3dState, child)[0]

            result.push(
                gameObject
            )

            return _getGameObjects(result, meta3dState, gameObject)
        }, result)
    }

    return disposeGameObjects(meta3dState, _getGameObjects([gameObject], meta3dState, gameObject))
}