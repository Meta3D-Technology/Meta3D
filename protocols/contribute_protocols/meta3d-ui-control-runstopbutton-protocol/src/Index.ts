import { rect } from "meta3d-type/src/contribute/UIControlProtocolConfigType"
import { imguiImplTexture } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"

export const uiControlName = "RunStopButton"

export type state = {
    runTexture: imguiImplTexture,
    stopTexture: imguiImplTexture,
}

export type inputData = {
    rect: rect,
    label: string,
}

type isRun = boolean

type isStop = boolean

export type outputData = [isRun, isStop]