import { state as meta3dState } from "meta3d-type"
import { componentName, basicCameraView, dataName } from "meta3d-component-basiccameraview-protocol"

export type createBasicCameraView = (meta3dState: meta3dState) => [meta3dState, basicCameraView]

export type active = (meta3dState: meta3dState, basicCameraView: basicCameraView) => meta3dState