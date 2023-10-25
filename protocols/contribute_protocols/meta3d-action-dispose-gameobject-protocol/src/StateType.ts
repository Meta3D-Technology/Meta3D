import type { List } from "immutable"
import { actionName as selectSceneTreeNodeActionName, state as selectSceneTreeNodeState } from "meta3d-action-select-scenetree-node-protocol"
import { removeGameObjectData } from "meta3d-engine-scene-sceneview-protocol/src/service/ecs/GameObject"

export const actionName = "DisposeGameObject"

export type uiData = null

export type state = {
    allDisposedGameObjectData: List<List<removeGameObjectData>>,
}

export type elementState = {
    [actionName]: state,
    [selectSceneTreeNodeActionName]: selectSceneTreeNodeState
}
