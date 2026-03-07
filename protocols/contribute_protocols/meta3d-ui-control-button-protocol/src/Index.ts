import { func } from "meta3d-input-checkbox-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const uiControlName = "Button"

export type state = null

export type inputFunc = nullable<func>

export type specificData = {
    label: string,
    isNotAbsolutePosition: boolean
}

type isClick = boolean

export type outputData = isClick