import { glbId } from "./EventType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import type { List } from "immutable"

export const actionName = "SelectAsset"

export type uiData = glbId

export type state = {
    selectedGlbId: nullable<glbId>,
    allSelectedGlbIds: List<glbId>
}

export type elementState = {
    [actionName]: state
}
