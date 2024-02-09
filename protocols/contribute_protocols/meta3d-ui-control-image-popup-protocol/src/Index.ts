import { imguiImplTexture } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { func } from "meta3d-input-popup-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const uiControlName = "ImagePopup"

export type imageBase64 = string

export type state = {
    clickTexture: nullable<imguiImplTexture>,
    lastClickTextureImageBase64: nullable<imageBase64>,
}

export type inputFunc = nullable<func>

export type specificData = {
    label: string,
    image: nullable<imageBase64>,
    id: string,
}

export type selectedIndex = number

export type outputData = nullable<selectedIndex>