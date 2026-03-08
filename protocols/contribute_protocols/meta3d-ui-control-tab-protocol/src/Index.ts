import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const uiControlName = "Tab"

export type state = null

export type inputFunc = null

export type specificData = {
    label: string,
    items: Array<[string, string]>,
}

type tabKey = nullable<string>

export type outputData = tabKey