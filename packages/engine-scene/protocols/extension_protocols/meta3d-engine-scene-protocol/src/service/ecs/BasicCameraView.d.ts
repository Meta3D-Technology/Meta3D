import { state as meta3dState } from "meta3d-type"
import { componentName, basicCameraView, dataName } from "meta3d-component-basiccameraview-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { gameObject } from "meta3d-gameobject-protocol/src/Index"

export type createBasicCameraView = (meta3dState: meta3dState) => [meta3dState, basicCameraView]

export type getGameObjects = (meta3dState: meta3dState, basicCameraView: basicCameraView) => Array<gameObject>

export type active = (meta3dState: meta3dState, basicCameraView: basicCameraView) => meta3dState

export type notActive = (meta3dState: meta3dState, basicCameraView: basicCameraView) => meta3dState

export type getViewWorldToCameraMatrix = (meta3dState: meta3dState, basicCameraView: basicCameraView) => nullable<Float32Array>

export type getActiveCameraView = (meta3dState: meta3dState, isDebug: boolean) => nullable<basicCameraView>

export type getName = (meta3dState: meta3dState, basicCameraView: basicCameraView) => nullable<string>

export type setName = (meta3dState: meta3dState, basicCameraView: basicCameraView, name: string) => meta3dState
