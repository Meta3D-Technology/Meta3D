import { rect } from "meta3d-type/src/contribute/UIControlProtocolConfigType"
import { outsideImmutableDataId } from "meta3d-event-sourcing-protocol/src/service/ServiceType"
import { imguiImplTexture } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { func } from "meta3d-input-asset-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const uiControlName = "Asset"

export type imageBase64 = string

export type state = {
    fileTexture: nullable<imguiImplTexture>,
    lastFileTextureImageBase64: nullable<imageBase64>,
}

export type inputData = {
    rect: rect,
    label: string,
}

export type inputFunc = nullable<func>

export type specificData = {
    rect: rect,
    label: string,
    image: nullable<imageBase64>,
}

type fileId = outsideImmutableDataId

type selectedFileId = nullable<fileId>

export type outputData = selectedFileId