import { func } from "meta3d-input-codeedit-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const uiControlName = "CodeEdit"

export type state = {
    editor: nullable<any>,
    container: HTMLElement
}

export type inputFunc = nullable<func>

export type specificData = {
    label: string,
    height: number,
    // initialCode: string
}

export type code = string

export type outputData = nullable<code>