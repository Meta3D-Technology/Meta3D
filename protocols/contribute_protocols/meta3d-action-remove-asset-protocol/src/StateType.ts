import type { List } from "immutable"
import { actionName as loadGlbActionName, state as loadGlbState } from "meta3d-action-load-glb-protocol"
import { actionName as selectAssetActionName, state as selectAssetState } from "meta3d-action-select-asset-protocol"
import { glbId } from "./EventType"

export const actionName = "RemoveAsset"

type glbName = string

type glb = ArrayBuffer

export type uiData = null

export type state = {
    allRemovedGlbData: List<[glbId, glbName, glb]>,
}

export type elementState = {
    [actionName]: state,
    [loadGlbActionName]: loadGlbState,
    [selectAssetActionName]: selectAssetState
}
