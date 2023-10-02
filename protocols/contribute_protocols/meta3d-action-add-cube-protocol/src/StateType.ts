import { gameObject } from "meta3d-gameobject-protocol"
import type { List } from "immutable"

export const actionName = "AddCube"

export type state = {
    addedGameObjectsForSceneView: List<gameObject>,
    addedGameObjectsForGameView: List<gameObject>,
}

export type elementState = {
    [actionName]: state
}
