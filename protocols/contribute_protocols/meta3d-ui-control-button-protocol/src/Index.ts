import { skin } from "meta3d-skin-button-protocol"

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