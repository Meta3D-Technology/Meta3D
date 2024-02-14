import { id } from "meta3d-action-add-asset-protocol/src/EventType"

export const eventName = "SetScriptAssetCodeEvent"

export type code = string

export type inputData = [id, code]