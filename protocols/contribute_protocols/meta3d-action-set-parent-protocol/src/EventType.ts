import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { gameObject } from "meta3d-gameobject-protocol"

export const eventName = "SetParentEvent"

export type inputData = [{
    source: gameObject,
    target: nullable<gameObject>
}]