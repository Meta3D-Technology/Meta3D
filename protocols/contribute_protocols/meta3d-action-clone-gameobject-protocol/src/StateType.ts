import type { List } from "immutable"
import { gameObject } from "meta3d-gameobject-protocol"
import { actionName as selectSceneTreeNodeActionName, state as selectSceneTreeNodeState } from "meta3d-action-select-scenetree-node-protocol"

export const actionName = "CloneGameObject"

export type uiData = null

export type state = {
    allClonedGameObjects: List<List<gameObject>>,
}

export type elementState = {
    [actionName]: state,
    [selectSceneTreeNodeActionName]: selectSceneTreeNodeState
}
