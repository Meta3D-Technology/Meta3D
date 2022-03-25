export const componentName = "TransformWorker"

export type config = { isDebug: boolean, transformCount: number, buffer: SharedArrayBuffer };

export const dataName = {
    localToWorldMatrix: 11,
}

export type transform = number

export type localToWorldMatrix = Float32Array