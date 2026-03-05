
import { func } from "meta3d-input-text-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const uiControlName = "Text"

export type state = null

export type inputFunc = nullable<func>

export type specificData = {
    isNotAbsolutePosition: boolean
}

export type outputData = null