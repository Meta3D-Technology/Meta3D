import { nullable } from "meta3d-commonlib-ts/src/nullable"
import type { List } from "immutable"
import { gameObject } from "meta3d-gameobject-protocol"

export const actionName = "SelectSceneTreeNode"

export type uiData = gameObject

export type state = {
    selectedGameObject: nullable<gameObject>,
    allSelectedGameObjects: List<gameObject>
}

export type elementState = {
    [actionName]: state
}
