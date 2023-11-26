import { rect } from "meta3d-type/src/contribute/UIControlProtocolConfigType"
import { imguiImplTexture } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export type clickUIData = null

export const uiControlName = "ImageButton"

export type imageBase64 = string

export type state = {
    clickTexture: nullable<imguiImplTexture>,
    lastClickTextureImageBase64: nullable<imageBase64>,
}

export type inputFunc = null

export type specificData = {
    rect: rect,
    label: string,
    image: nullable<imageBase64>,
}

type isClick = boolean

export type outputData = isClick