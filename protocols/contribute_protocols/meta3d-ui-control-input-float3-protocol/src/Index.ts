import { rect } from "meta3d-type/src/contribute/UIControlProtocolConfigType"
import { func } from "meta3d-input-input-float3-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const uiControlName = "InputFloat3"

export type state = null

export type inputFunc = nullable<func>

export type specificData = {
    rect: rect,
    label: string,
    step: number,
    stepFast: number
}

export type float3 = [number, number, number]

export type outputData = nullable<float3>