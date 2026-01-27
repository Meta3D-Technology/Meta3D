import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const actionName = "CareerModInfo"

export type uiData = nullable<string>

export type state = {
    info: uiData
}


