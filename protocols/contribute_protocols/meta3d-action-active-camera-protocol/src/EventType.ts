import { gameObject } from "meta3d-gameobject-protocol"

export const eventName = "ActiveCameraEvent"

export type isActive = boolean

export type inputData = [isActive, gameObject]