import { gameObject } from "meta3d-gameobject-protocol"
import type { List } from "immutable"

export const actionName = "AddGLBToScene"

export type state = {
    importedGameObjects: List<gameObject>,
}

export type elementState = {
    [actionName]: state
}
