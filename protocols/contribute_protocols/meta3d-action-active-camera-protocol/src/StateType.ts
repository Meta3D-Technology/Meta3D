import type { List } from "immutable"
import { basicCameraView } from "meta3d-component-basiccameraview-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable";

export const actionName = "ActiveCamera"

export type uiData = null

export type state = {
    allActivedBasicCameraViews: List<nullable<basicCameraView>>,
}


