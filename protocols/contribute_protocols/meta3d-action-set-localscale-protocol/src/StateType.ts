import { localScale } from "meta3d-component-transform-protocol"
import type { List } from "immutable"
import { inputData } from "./EventType"
import { gameObject } from "meta3d-gameobject-protocol"

export const actionName = "SetLocalScale"

export type uiData = inputData

export type state = {
    allLocalScaleData: List<[gameObject, localScale]>
}

export type elementState = {
    [actionName]: state
}
