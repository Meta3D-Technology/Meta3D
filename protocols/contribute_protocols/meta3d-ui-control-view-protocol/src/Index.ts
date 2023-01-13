import { rect } from "meta3d-type/src/contribute/UIControlProtocolConfigType"

export type textureID = string

export type inputData = {
    rect: rect,
    label: string,
    textureID: textureID,
}

export type outputData = null