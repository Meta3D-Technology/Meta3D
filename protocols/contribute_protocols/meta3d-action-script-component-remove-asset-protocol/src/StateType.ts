import { assetData } from "meta3d-component-script-protocol/src/Index"
import type { List } from "immutable"
import { name } from "./EventType"

export const actionName = "ScriptComponentRemoveAsset"

export type uiData = [number, name]

export type state = {
    removedAssetData: List<assetData>,
}