import { gameObject, name } from "meta3d-gameobject-protocol"

export const eventName = "SetGameObjectNameEvent"

export type inputData = [gameObject, name]