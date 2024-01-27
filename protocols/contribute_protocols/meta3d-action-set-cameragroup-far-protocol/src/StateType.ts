import type { List, Map } from "immutable"
import { gameObject } from "meta3d-gameobject-protocol"
import { perspectiveCameraProjection } from "meta3d-component-perspectivecameraprojection-protocol"
import { float1 } from "meta3d-ui-control-input-float1-protocol"

export const actionName = "SetCameraGroupFar"

export type uiData = float1

export type state = {
    allFarData: List<[gameObject, float1]>,
    farMap: Map<perspectiveCameraProjection, float1>
}


