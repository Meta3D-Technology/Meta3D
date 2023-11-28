import { gameObject } from "meta3d-gameobject-protocol"
import { localEulerAngles } from "meta3d-component-transform-protocol"

export const eventName = "SetLocalEulerAngleEvent"

export type inputData = [gameObject, localEulerAngles]