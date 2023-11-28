import type { List } from "immutable"
import { gameObject, name } from "meta3d-gameobject-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { text } from "meta3d-ui-control-input-text-protocol"

export const actionName = "SetGameObjectName"

export type uiData = text

export type state = {
    allGameObjectNameData: List<[gameObject, nullable<name>]>
}


