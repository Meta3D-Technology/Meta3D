import { gameObject } from "meta3d-gameobject-protocol"
import type { List } from "immutable"

export const actionName = "AddCube"

export type state = {
    addedGameObjects: List<gameObject>,
}

export type elementState = {
    [actionName]: state
}
