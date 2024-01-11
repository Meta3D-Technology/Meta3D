import { strictNullable } from "meta3d-commonlib-ts/src/nullable"
import { imageBase64 } from "./EventType"

export const actionName = "LoadAppPreview"

export type uiData = null

export type state = {
    appPreview: strictNullable<imageBase64>
}


