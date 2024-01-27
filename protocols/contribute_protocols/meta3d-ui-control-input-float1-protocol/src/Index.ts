
import { func } from "meta3d-input-input-float1-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const uiControlName = "InputFloat1"

export type state = null

export type inputFunc = nullable<func>

export type specificData = {
    label: string,
    step: number,
    stepFast: number
}

export type float1 = number

export type outputData = nullable<float1>