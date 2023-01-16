import { rect } from "meta3d-type/src/contribute/UIControlProtocolConfigType"
import { Merge } from "meta3d-commonlib-ts/src/type"

export const uiControlName = "SceneView"

export const textureID = "sceneView"

export type state = {
    rect: rect,
}

export type inputData = Merge<state, {
    label: string,
}>

export type outputData = null