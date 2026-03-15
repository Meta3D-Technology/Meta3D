// import { imguiImplTexture } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { func } from "meta3d-input-mod-unit-dynamic-feature-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { singleFeatureData } from "meta3d-action-mod-unit-init-protocol"

export const uiControlName = "DynamicUnitFeatures"

export type state = null

export type inputFunc = nullable<func>

export type arr = Array<singleFeatureData>


export type specificData = {
    label: string,
}

export type outputData = [arr, boolean]
