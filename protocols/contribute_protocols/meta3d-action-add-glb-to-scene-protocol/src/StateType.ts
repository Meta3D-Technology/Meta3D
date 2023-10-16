import { gameObject } from "meta3d-gameobject-protocol"
import type { List } from "immutable"

export const actionName = "AddGLBToScene"

export type state = {
    importedGameObjectsForSceneView: List<gameObject>,
    importedGameObjectsForGameView: List<gameObject>,
}

export type elementState = {
    [actionName]: state
}
