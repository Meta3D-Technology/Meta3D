import { func } from "meta3d-input-mod-dynamic-texts-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const uiControlName = "DynamicTexts"

export type state = null

export type inputFunc = nullable<func>


export type specificData = {
    label: string,
}

export type outputData = null
