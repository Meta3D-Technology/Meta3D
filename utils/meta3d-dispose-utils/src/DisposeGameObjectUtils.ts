import { state as meta3dState } from "meta3d-type"
import { gameObject } from "meta3d-gameobject-protocol"
import { service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"

export let disposeGameObjectAndAllChildren = (meta3dState: meta3dState,
    editorWholeService: editorWholeService,
    gameObject: gameObject): meta3dState => {
    let { disposeGameObjects, getGameObjectAndAllChildren } = editorWholeService.scene(meta3dState).gameObject

    return disposeGameObjects(meta3dState, getGameObjectAndAllChildren(meta3dState, gameObject))
}