export const componentName = "PerspectiveCameraProjection"

export type state = any

export type config = { readonly isDebug: boolean };

export const dataName = {
    pMatrix: 0,
    fovy: 1,
    aspect: 2,
    near: 3,
    far: 4,
    dirty: 5,
}

export type perspectiveCameraProjection = number

export type needDisposedComponents = perspectiveCameraProjection[]

export type pMatrix = Float32Array

export type fovy = number

export type aspect = number

export type near = number

export type far = number

export type dirty = boolean