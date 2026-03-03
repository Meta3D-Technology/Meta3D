import { imguiImplTexture } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { func } from "meta3d-input-grid-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const uiControlName = "Grid"

export type imageBase64 = string

export type state = {
    gridTextures: Array<imguiImplTexture>,
}

export type inputFunc = nullable<func>

export type specificData = {
    label: string,
    columnCount: number,
    cellWidth: number,
    totalHeight: number,
}

export type selectedIndex = number

export type outputData = nullable<selectedIndex>