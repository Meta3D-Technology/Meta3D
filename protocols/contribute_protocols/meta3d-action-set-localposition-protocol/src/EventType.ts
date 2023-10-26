import { gameObject } from "meta3d-gameobject-protocol"
import { localPosition } from "meta3d-component-transform-protocol"

export const eventName = "SetLocalPositionEvent"

export type inputData = [gameObject, localPosition]