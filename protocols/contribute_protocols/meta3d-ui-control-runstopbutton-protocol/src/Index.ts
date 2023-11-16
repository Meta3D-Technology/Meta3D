import { rect } from "meta3d-type/src/contribute/UIControlProtocolConfigType"
import { imguiImplTexture } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { func } from "meta3d-input-runstopbutton-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const uiControlName = "RunStopButton"

export type state = {
    runTexture: imguiImplTexture,
    stopTexture: imguiImplTexture,
}

export type inputFunc = nullable<func>

export type specificData = {
    rect: rect,
    label: string,
}

type isRun = boolean

type isStop = boolean

export type outputData = [isRun, isStop]