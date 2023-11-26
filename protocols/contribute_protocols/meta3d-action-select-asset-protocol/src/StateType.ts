import { fileId } from "./EventType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import type { List } from "immutable"

export const actionName = "SelectAsset"

export type uiData = fileId

export type state = {
    selectedAssetFileId: nullable<fileId>,
    allSelectedFileAssetIds: List<fileId>
}


