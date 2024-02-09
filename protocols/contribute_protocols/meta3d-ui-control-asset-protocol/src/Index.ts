import { outsideImmutableDataId } from "meta3d-event-sourcing-protocol/src/service/ServiceType"
import { func } from "meta3d-input-asset-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const uiControlName = "Asset"

export type state = null

export type inputFunc = nullable<func>

export type specificData = {
    label: string,
}

type fileId = outsideImmutableDataId

type selectedFileId = nullable<fileId>

export type outputData = selectedFileId