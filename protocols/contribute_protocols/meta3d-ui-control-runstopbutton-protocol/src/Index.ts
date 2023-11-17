import { rect } from "meta3d-type/src/contribute/UIControlProtocolConfigType"
import { imguiImplTexture } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { func } from "meta3d-input-runstopbutton-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const uiControlName = "RunStopButton"

export type imageBase64 = string

export type state = {
    runTexture: nullable<imguiImplTexture>,
    stopTexture: nullable<imguiImplTexture>,
    lastRunTextureImageBase64: nullable<imageBase64>,
    lastStopTextureImageBase64: nullable<imageBase64>,
}

export type inputFunc = nullable<func>

export type specificData = {
    rect: rect,
    label: string,
    image1: nullable<imageBase64>,
    image2: nullable<imageBase64>,
}

type isRun = boolean

type isStop = boolean

export type outputData = [isRun, isStop]