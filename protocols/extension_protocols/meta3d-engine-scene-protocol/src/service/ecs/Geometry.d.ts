import { state as meta3dState } from "meta3d-type"
import { geometry, componentName, dataName } from "meta3d-component-geometry-protocol"

export type createGeometry = (meta3dState: meta3dState) => [meta3dState, geometry]

export type setVertices = (meta3dState: meta3dState, geometry: geometry, vertices: Float32Array) => meta3dState

export type setIndices = (meta3dState: meta3dState, geometry: geometry, indices: Uint32Array) => meta3dState