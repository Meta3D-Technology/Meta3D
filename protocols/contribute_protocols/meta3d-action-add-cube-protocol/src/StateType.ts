import { gameObject } from "meta3d-gameobject-protocol"
import type { List } from "immutable"

export const actionName = "AddCube"

export type uiData = null

export type state = {
    addedGameObjects: List<gameObject>,
}


