export const componentName = "PerspectiveCameraProjection"

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

export type pMatrix = number

export type fovy = number

export type aspect = number

export type near = number

export type far = number

export type dirty = boolean