import { func } from "meta3d-input-mod-unit-dynamic-reward-prop-protocol"
import { propData } from "meta3d-action-mod-unit-init-protocol/src/StateType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const uiControlName = "ModUnitDynamicRewardProp"

export type state = null

export type inputFunc = nullable<func>

export type specificData = {
    label: string,
}

export type outputData = [Array<propData>, boolean]
