import { localPosition } from "meta3d-component-transform-protocol"
import type { List } from "immutable"
import { inputData } from "./EventType"
import { gameObject } from "meta3d-gameobject-protocol"

export const actionName = "SetLocalPosition"

export type uiData = inputData

export type state = {
    allLocalPositionData: List<[gameObject, localPosition]>
}

export type elementState = {
    [actionName]: state
}
