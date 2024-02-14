import type { List } from "immutable"
import { id } from "meta3d-action-add-asset-protocol/src/EventType"
import { code } from "./EventType"

export const actionName = "SetScriptAssetCode"

export type uiData = code

export type state = {
    allScriptAssetCodeData: List<[id, code]>
}


