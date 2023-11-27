import { state as meta3dState } from "meta3d-type"
import { func } from "meta3d-input-window-protocol"
import { rect } from "meta3d-type/src/contribute/UIControlProtocolConfigType"

export const uiControlName = "Window"

export type state = null

type childrenFunc = (meta3dState: meta3dState) => Promise<meta3dState>

export type inputFunc = nullable<func>

export type specificData = {
    rect: rect,
    label: string,
    childrenFunc: childrenFunc
}

export type outputData = null