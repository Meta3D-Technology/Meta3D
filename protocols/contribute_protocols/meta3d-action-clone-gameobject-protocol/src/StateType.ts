import type { List } from "immutable"
import { gameObject } from "meta3d-gameobject-protocol"

export const actionName = "CloneGameObject"

export type uiData = null

export type state = {
    allClonedGameObjects: List<List<gameObject>>,
}