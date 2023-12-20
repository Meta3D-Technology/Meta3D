import { localEulerAngles } from "meta3d-component-transform-protocol"
import type { List, Map } from "immutable"
import { gameObject } from "meta3d-gameobject-protocol"
import { transform } from "meta3d-component-transform-protocol"
import { float3 } from "meta3d-ui-control-input-float3-protocol"

export const actionName = "SetLocalEulerAngle"

export type uiData = float3

export type state = {
    allLocalEulerAngleData: List<[gameObject, localEulerAngles]>,
    localEulerAngleMap: Map<transform, float3>
}


