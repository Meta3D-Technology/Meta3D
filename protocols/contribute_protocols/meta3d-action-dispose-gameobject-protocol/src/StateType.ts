import type { List } from "immutable"
import { actionName as selectSceneTreeNodeActionName, state as selectSceneTreeNodeState } from "meta3d-action-select-scenetree-node-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { removeGameObjectData } from "meta3d-engine-scene-sceneview-protocol/src/service/ecs/GameObject"
import { gameObject } from "meta3d-gameobject-protocol"
import { sceneTreeIndexData } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"

export const actionName = "DisposeGameObject"

export type uiData = null

export type state = {
    allSelectedGameObjects: List<gameObject>,
    allLastSceneTreeSelectedData: List<nullable<sceneTreeIndexData>>,
    allDisposedGameObjectData: List<List<removeGameObjectData>>,
}

export type elementState = {
    [actionName]: state,
    [selectSceneTreeNodeActionName]: selectSceneTreeNodeState
}
