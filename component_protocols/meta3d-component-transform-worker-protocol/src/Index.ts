import { transform as transformType, update as updateType } from "meta3d-component-transform-common-protocol"

export const componentName = "TransformWorker"

export type config = { isDebug: boolean, transformCount: number, buffer: SharedArrayBuffer }

export const dataName = {
    localToWorldMatrix: 11,
    update: 13,
}

export type transform = transformType

export type localToWorldMatrix = Float32Array

export type update = updateType