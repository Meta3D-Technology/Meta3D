
import { func } from "meta3d-input-input-text-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const uiControlName = "InputText"

export type state = null

export type inputFunc = nullable<func>

export type specificData = {
    label: string,
    maxLength: number
}

export type text = string

export type outputData = nullable<text>