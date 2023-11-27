import type { List } from "immutable"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { removeGameObjectData } from "meta3d-engine-scene-protocol/src/service/ecs/GameObject"
import { gameObject } from "meta3d-gameobject-protocol"
import { treeIndexData } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"

export const actionName = "DisposeGameObject"

export type uiData = null

export type state = {
    allSelectedGameObjects: List<gameObject>,
    allLastSceneTreeSelectedData: List<nullable<treeIndexData>>,
    allDisposedGameObjectData: List<List<removeGameObjectData>>,
}
