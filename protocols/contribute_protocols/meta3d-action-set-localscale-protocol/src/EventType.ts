import { gameObject } from "meta3d-gameobject-protocol"
import { localScale } from "meta3d-component-transform-protocol"

export const eventName = "SetLocalScaleEvent"

export type inputData = [gameObject, localScale]