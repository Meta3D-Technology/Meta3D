import { rect } from "meta3d-type/src/contribute/UIControlProtocolConfigType"

export const uiControlName = "Button"

export type state = null

export type inputData = {
    rect: rect,
    label: string,
}

type isClick = boolean

export type outputData = isClick