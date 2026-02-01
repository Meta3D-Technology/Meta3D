
import { func } from "meta3d-input-input-int1-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const uiControlName = "InputInt1"

export type state = null

export type inputFunc = nullable<func>

export type specificData = {
    label: string,
    step: number,
    stepFast: number,
    minValue: nullable<number>,
    maxValue: nullable<number>,
}

export type int1 = number

export type outputData = nullable<int1>