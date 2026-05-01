import type { Map } from "immutable"
import { fbxData, fbxName } from "./EventType"

export const actionName = "UnitModUploadModelFile"

export type uiData = null

export type state = {
    files: Map<string, [fbxName, fbxData]>
}


