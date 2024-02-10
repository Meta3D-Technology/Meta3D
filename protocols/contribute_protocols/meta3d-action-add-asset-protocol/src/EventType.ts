import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const eventName = "AddAssetEvent"

export type selectedIndex = number

export type glbData = ArrayBuffer

export type glbName = string

// export type glbData = [glbName, glb]

export type id = string

export type inputData = [selectedIndex, id, nullable<glbName>, nullable<glbData>]