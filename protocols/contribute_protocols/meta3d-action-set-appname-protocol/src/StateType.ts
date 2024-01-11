import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { text } from "meta3d-ui-control-input-text-protocol"
import { name } from "./EventType"

export const actionName = "SetAppName"

export type uiData = text

export type state = {
    appName: nullable<name>
}


