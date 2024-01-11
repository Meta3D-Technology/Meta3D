import { state as meta3dState } from "meta3d-type"
import { func } from "meta3d-input-modal-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const uiControlName = "Modal"

export type state = {
    isOpen: boolean
}

type childrenFunc = (meta3dState: meta3dState) => Promise<meta3dState>

export type inputFunc = nullable<func>

export type specificData = {
    label: string,
    childrenFunc: childrenFunc
}

export type outputData = null