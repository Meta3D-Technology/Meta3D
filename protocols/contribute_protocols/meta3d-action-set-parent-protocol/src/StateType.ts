import type { List } from "immutable"
import { gameObject } from "meta3d-gameobject-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { treeDragData } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"

export const actionName = "SetParent"

export type uiData = treeDragData

export type state = {
    allHierachyData: List<{
        source: gameObject,
        oldParent: nullable<gameObject>
    }>
}


