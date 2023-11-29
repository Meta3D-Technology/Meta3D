
import { imguiImplTexture } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { func } from "meta3d-input-switch-button-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const uiControlName = "SwitchButton"

export type imageBase64 = string

export type state = {
    click1Texture: nullable<imguiImplTexture>,
    click2Texture: nullable<imguiImplTexture>,
    lastClick1TextureImageBase64: nullable<imageBase64>,
    lastClick2TextureImageBase64: nullable<imageBase64>,
}

export type inputFunc = nullable<func>

export type specificData = {
    label: string,
    image1: nullable<imageBase64>,
    image2: nullable<imageBase64>,
}

type isClick1 = boolean

type isClick2 = boolean

export type outputData = [isClick1, isClick2]