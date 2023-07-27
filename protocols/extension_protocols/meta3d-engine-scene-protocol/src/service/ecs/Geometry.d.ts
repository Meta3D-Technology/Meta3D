import { state as meta3dState } from "meta3d-type"
import { geometry, componentName, dataName } from "meta3d-component-geometry-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export type createGeometry = (meta3dState: meta3dState) => [meta3dState, geometry]

export type getVertices = (meta3dState: meta3dState, geometry: geometry) => nullable<Float32Array>

export type setVertices = (meta3dState: meta3dState, geometry: geometry, vertices: Float32Array) => meta3dState

export type getIndices = (meta3dState: meta3dState, geometry: geometry) => nullable<Uint32Array>

export type setIndices = (meta3dState: meta3dState, geometry: geometry, indices: Uint32Array) => meta3dState