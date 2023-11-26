import type { List } from "immutable"
import { fileId } from "./EventType"

export const actionName = "RemoveAsset"

type fileName = string

type file = ArrayBuffer

export type uiData = null

export type state = {
    allRemoveAssetData: List<[fileId, fileName, file]>,
}