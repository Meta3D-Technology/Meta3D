import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const actionName = "UnitModUploadModelSnapshot"

export type uiData = null

export type base64 = string

export type state = {
    snapshot: nullable<base64>
}


