import { state as meta3dState } from "meta3d-type"
import { func } from "meta3d-input-window-protocol"
import { windowFlags } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const uiControlName = "Window"

export type state = null

type childrenFunc = (meta3dState: meta3dState) => Promise<meta3dState>

export type inputFunc = nullable<func>

type flagSelectValue = {
    selected: windowFlags
}

export type specificData = {
    label: string,
    flag: flagSelectValue,
    childrenFunc: childrenFunc
}

export type outputData = null