import { func } from "meta3d-input-checkbox-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const uiControlName = "Checkbox"

export type state = null

export type inputFunc = nullable<func>

export type specificData = {
    label: string,
    isSelect: boolean,
}

export type isSelect = boolean

export type outputData = nullable<isSelect>