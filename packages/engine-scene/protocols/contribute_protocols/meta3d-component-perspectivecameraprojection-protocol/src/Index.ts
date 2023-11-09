export const componentName = "PerspectiveCameraProjection"

export type state = any

export type config = { readonly isDebug: boolean };

export const dataName = {
  name:0,
  pMatrix: 1,
  fovy: 2,
  aspect: 3,
  near: 4,
  far: 5,
  dirty: 6,
}

export type perspectiveCameraProjection = number

export type needDisposedComponents = perspectiveCameraProjection[]

export type pMatrix = Float32Array

export type fovy = number

export type aspect = number

export type near = number

export type far = number

export type dirty = boolean