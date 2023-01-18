import { state as meta3dState } from "meta3d-type"
import { componentName, perspectiveCameraProjection, near, far, fovy, aspect, dataName } from "meta3d-component-perspectivecameraprojection-protocol"

export type createPerspectiveCameraProjection = (meta3dState: meta3dState) => [meta3dState, perspectiveCameraProjection]

export type setFovy = (meta3dState: meta3dState, perspectiveCameraProjection: perspectiveCameraProjection, fovy: number) => meta3dState

export type setNear = (meta3dState: meta3dState, perspectiveCameraProjection: perspectiveCameraProjection, near: number) => meta3dState

export type setFar = (meta3dState: meta3dState, perspectiveCameraProjection: perspectiveCameraProjection, far: number) => meta3dState

export type setAspect = (meta3dState: meta3dState, perspectiveCameraProjection: perspectiveCameraProjection, aspect: number) => meta3dState