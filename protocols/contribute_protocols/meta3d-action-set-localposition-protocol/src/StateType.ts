import { localPosition } from "meta3d-component-transform-protocol"
import type { List } from "immutable"
import { gameObject } from "meta3d-gameobject-protocol"
import { float3 } from "meta3d-ui-control-input-float3-protocol"

export const actionName = "SetLocalPosition"

export type uiData = float3

export type state = {
    allLocalPositionData: List<[gameObject, localPosition]>
}


