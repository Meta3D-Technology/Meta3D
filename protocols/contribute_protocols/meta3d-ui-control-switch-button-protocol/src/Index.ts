import { rect } from "meta3d-type/src/contribute/UIControlProtocolConfigType"
import { imguiImplTexture } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { func } from "meta3d-input-switch-button-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const uiControlName = "SwitchButton"

export type imageBase64 = string

export type state = {
    event1Texture: nullable<imguiImplTexture>,
    event2Texture: nullable<imguiImplTexture>,
    lastEvent1TextureImageBase64: nullable<imageBase64>,
    lastEvent2TextureImageBase64: nullable<imageBase64>,
}

export type inputFunc = nullable<func>

export type specificData = {
    rect: rect,
    label: string,
    image1: nullable<imageBase64>,
    image2: nullable<imageBase64>,
}

type isEvent1 = boolean

type isEvent2 = boolean

export type outputData = [isEvent1, isEvent2]