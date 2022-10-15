import { skin } from "meta3d-skin-button-protocol"

export const uiControlName = "Button"

type rect = {
    x: number,
    y: number,
    width: number,
    height: number
}

export type inputData = {
    rect: rect,
    // text: string
    skin: skin
}

type isClick = boolean

export type outputData = isClick