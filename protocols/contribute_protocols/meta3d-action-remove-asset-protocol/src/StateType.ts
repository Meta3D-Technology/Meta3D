import type { List } from "immutable"
import { asset } from "meta3d-action-add-asset-protocol/src/StateType"

export const actionName = "RemoveAsset"

export type uiData = null

export type state = {
    allRemoveAssetData: List<asset>,
}