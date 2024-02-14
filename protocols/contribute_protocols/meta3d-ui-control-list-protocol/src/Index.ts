import { imguiImplTexture } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { func } from "meta3d-input-list-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const uiControlName = "List"

export type imageBase64 = string

export type state = {
    removeTexture: nullable<imguiImplTexture>,
    lastRemoveTextureImageBase64: nullable<imageBase64>,
}

export type inputFunc = nullable<func>

export type specificData = {
    label: string,
    isRemoveable: boolean,
    itemWidth: number,
    itemHeight: number,
    removeImage: nullable<imageBase64>
}

export type outputData = [nullable<[number, string]>, nullable<boolean>]