// import { imguiImplTexture } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { func } from "meta3d-input-mod-unit-dynamic-bahaviourdata-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const uiControlName = "DynamicUnitBehaviourData"

export type state = null

export type inputFunc = nullable<func>

export type arr = Array<[string, string, number]>


export type specificData = {
    label: string,
}

export type outputData = [arr, boolean]
