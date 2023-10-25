import type { List } from "immutable"
import { gameObject } from "meta3d-gameobject-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const actionName = "SetParent"

export type uiData = {
    source: gameObject,
    target: gameObject
}

export type state = {
    allHierachyData: List<{
        source: gameObject,
        oldParent: nullable<gameObject>
    }>
}

export type elementState = {
    [actionName]: state
}
