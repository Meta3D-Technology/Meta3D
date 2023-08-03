import { state as meta3dState } from "meta3d-type"
import { componentName, perspectiveCameraProjection, near, far, fovy, aspect, dataName, pMatrix } from "meta3d-component-perspectivecameraprojection-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export type createPerspectiveCameraProjection = (meta3dState: meta3dState) => [meta3dState, perspectiveCameraProjection]

export type getPMatrix = (meta3dState: meta3dState, perspectiveCameraProjection: perspectiveCameraProjection) => nullable<pMatrix>

export type getFovy = (meta3dState: meta3dState, perspectiveCameraProjection: perspectiveCameraProjection) => nullable<fovy>

export type setFovy = (meta3dState: meta3dState, perspectiveCameraProjection: perspectiveCameraProjection, fovy: number) => meta3dState

export type getNear = (meta3dState: meta3dState, perspectiveCameraProjection: perspectiveCameraProjection) => nullable<near>

export type setNear = (meta3dState: meta3dState, perspectiveCameraProjection: perspectiveCameraProjection, near: number) => meta3dState

export type getFar = (meta3dState: meta3dState, perspectiveCameraProjection: perspectiveCameraProjection) => nullable<far>

export type setFar = (meta3dState: meta3dState, perspectiveCameraProjection: perspectiveCameraProjection, far: number) => meta3dState

export type getAspect = (meta3dState: meta3dState, perspectiveCameraProjection: perspectiveCameraProjection) => nullable<aspect>

export type setAspect = (meta3dState: meta3dState, perspectiveCameraProjection: perspectiveCameraProjection, aspect: number) => meta3dState