import { gameObject } from "meta3d-gameobject-protocol"
import { far } from "meta3d-component-perspectivecameraprojection-protocol"

export const eventName = "SetCameraGroupFarEvent"

export type inputData = [gameObject, far]