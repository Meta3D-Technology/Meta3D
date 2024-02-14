import type { List } from "immutable"
import { name } from "meta3d-action-add-asset-protocol"
import { id } from "meta3d-action-add-asset-protocol/src/EventType"
import { text } from "meta3d-ui-control-input-text-protocol"

export const actionName = "SetScriptAssetName"

export type uiData = text

export type state = {
    allScriptAssetNameData: List<[id, name, name]>
}


