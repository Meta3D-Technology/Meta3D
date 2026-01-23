import { func } from "meta3d-input-popup-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const uiControlName = "Popup"

export type state = {
    lastSelectedIndex: nullable<number>
}

export type inputFunc = nullable<func>

export type specificData = {
    label: string,
    id: string,
    // text?: string,
    isShowSelectedItem: boolean,
}

export type selectedIndex = number

export type outputData = nullable<selectedIndex>