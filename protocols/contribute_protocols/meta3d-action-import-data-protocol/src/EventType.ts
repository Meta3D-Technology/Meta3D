import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const eventName = "ImportDataEvent"

type sceneGLB = ArrayBuffer

type assetData = ArrayBuffer

export type inputData = [sceneGLB, nullable<assetData>]