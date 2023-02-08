import { state as meta3dState } from "meta3d-type"
import { transform, componentName, dataName, localPosition } from "meta3d-component-transform-protocol"
import { lookAt as lookAtTransform } from "meta3d-component-commonlib"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export type createTransform = (meta3dState: meta3dState) => [meta3dState, transform]

export type getLocalPosition = (meta3dState: meta3dState, transform: transform) => nullable<localPosition>

export type setLocalPosition = (meta3dState: meta3dState, transform: transform, localPosition: localPosition) => meta3dState

export type lookAt = (meta3dState: meta3dState, transform: transform, target: [number, number, number]) => meta3dState