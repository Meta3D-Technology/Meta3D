import { state as meta3dState } from "meta3d-type"
import { geometry, componentName, dataName } from "meta3d-component-geometry-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { gameObject } from "meta3d-gameobject-protocol/src/Index"

export type createGeometry = (meta3dState: meta3dState) => [meta3dState, geometry]

export type getVertices = (meta3dState: meta3dState, geometry: geometry) => nullable<Float32Array>

export type setVertices = (meta3dState: meta3dState, geometry: geometry, vertices: Float32Array) => meta3dState

export type getNormals = (meta3dState: meta3dState, geometry: geometry) => nullable<Float32Array>

export type setNormals = (meta3dState: meta3dState, geometry: geometry, normals: Float32Array) => meta3dState

export type getTexCoords = (meta3dState: meta3dState, geometry: geometry) => nullable<Float32Array>

export type setTexCoords = (meta3dState: meta3dState, geometry: geometry, texCoords: Float32Array) => meta3dState

export type getTangents = (meta3dState: meta3dState, geometry: geometry) => nullable<Float32Array>

export type setTangents = (meta3dState: meta3dState, geometry: geometry, tangents: Float32Array) => meta3dState

export type getIndices = (meta3dState: meta3dState, geometry: geometry) => nullable<Uint32Array>

export type setIndices = (meta3dState: meta3dState, geometry: geometry, indices: Uint32Array) => meta3dState

export type getGameObjects = (meta3dState: meta3dState, geometry: geometry) => Array<gameObject>