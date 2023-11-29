import { cond } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { state as meta3dState } from "meta3d-type"
export const uiControlName = "Collapsing"

export type state = null

type childrenFunc = (meta3dState: meta3dState) => Promise<meta3dState>

export type inputFunc = null

type condSelectValue = {
    selected: cond
}

export type specificData = {
    label: string,
    isOpen: boolean,
    cond: condSelectValue,
    childrenFunc: childrenFunc
}

export type outputData = null