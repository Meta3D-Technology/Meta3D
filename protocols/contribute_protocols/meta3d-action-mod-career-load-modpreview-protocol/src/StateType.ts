import { strictNullable } from "meta3d-commonlib-ts/src/nullable"
import { imageBase64 } from "./EventType"

export const actionName = "ModLoadCareerModPreview"

export type uiData = null

export type state = {
    preview: strictNullable<imageBase64>
}


