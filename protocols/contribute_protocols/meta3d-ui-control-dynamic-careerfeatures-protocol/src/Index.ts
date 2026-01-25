// import { imguiImplTexture } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { func } from "meta3d-input-mod-career-dynamic-careerfeatures-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import type { Map, List } from "immutable"

export const uiControlName = "DynamicCareerFeatures"

// export type imageBase64 = string

export type state = null

export type inputFunc = nullable<func>

export type map = Map<string, List<number>>

export type specificData = {
    label: string,
    // isRemoveable: boolean,
    // itemWidth: number,
    // itemHeight: number,
    // removeImage: nullable<imageBase64>
}

export type outputData = [map, boolean]