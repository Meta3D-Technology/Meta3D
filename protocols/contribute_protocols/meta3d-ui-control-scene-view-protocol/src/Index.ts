import { rect } from "meta3d-type/src/contribute/UIControlProtocolConfigType"
import { Merge } from "meta3d-commonlib-ts/src/type"
// import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { outsideImmutableDataId } from "meta3d-event-sourcing-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const uiControlName = "SceneView"

export const textureID = "sceneView"

export const dragDropType = "DND_SceneView"

export type dragDropDataGeneric<Data> = {
    fromUIControlName: string,
    data: Data
}

export type dragDropData = dragDropDataGeneric<any>

type fileId = outsideImmutableDataId

export type dropAssetFileUIData = dragDropDataGeneric<fileId>

export type state = {
    rect: rect,
}

export type inputFunc = null

export type specificData = Merge<state, {
    label: string,
}>

export type outputData = nullable<dropAssetFileUIData>