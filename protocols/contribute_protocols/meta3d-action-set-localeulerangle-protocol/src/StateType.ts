import { localEulerAngles } from "meta3d-component-transform-protocol"
import type { List } from "immutable"
import { inputData } from "./EventType"
import { gameObject } from "meta3d-gameobject-protocol"

export const actionName = "SetLocalEulerAngle"

export type uiData = inputData

export type state = {
    allLocalEulerAngleData: List<[gameObject, localEulerAngles]>
}

export type elementState = {
    [actionName]: state
}
