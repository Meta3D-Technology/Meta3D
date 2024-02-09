import { id } from "meta3d-action-add-asset-protocol/src/StateType"

export const eventName = "SetScriptAssetCodeEvent"

export type code = string

export type inputData = [id, code]