import { state as meta3dState } from "meta3d-type"
import { gameObject } from "meta3d-gameobject-protocol"
import { service as engineWholeService } from "meta3d-engine-whole-sceneview-protocol/src/service/ServiceType"

export let disposeGameObjectAndAllChildren = <engineWholeService_ extends engineWholeService>(meta3dState: meta3dState,
    engineWholeService: engineWholeService_,
    gameObject: gameObject): meta3dState => {
    let { disposeGameObjects, getGameObjectAndAllChildren } = engineWholeService.scene.gameObject

    return disposeGameObjects(meta3dState, getGameObjectAndAllChildren(meta3dState, gameObject))
}