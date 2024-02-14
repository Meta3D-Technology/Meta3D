import { name } from "meta3d-action-add-asset-protocol/src/StateType"
import { id } from "meta3d-action-add-asset-protocol/src/EventType"

export const eventName = "SetScriptAssetNameEvent"

export type inputData = [id, name]