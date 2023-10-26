import type { List } from "immutable"
import { gameObject, name } from "meta3d-gameobject-protocol"
import { inputData } from "./EventType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const actionName = "SetGameObjectName"

export type uiData = inputData

export type state = {
    allGameObjectNameData: List<[gameObject, nullable<name>]>
}

export type elementState = {
    [actionName]: state
}
