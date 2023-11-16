import { state as meta3dState } from "meta3d-type"
import { rect } from "meta3d-type/src/contribute/UIControlProtocolConfigType"

export const uiControlName = "Window"

export type state = null

type childrenFunc = (meta3dState: meta3dState) => Promise<meta3dState>

export type inputFunc = null

export type specificData = {
    rect: rect,
    label: string,
    childrenFunc: childrenFunc
}

export type outputData = null