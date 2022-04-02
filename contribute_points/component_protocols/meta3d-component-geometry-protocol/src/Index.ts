import { geometry as geometryType, vertices as verticesType, indices as indicesType, indicesCount as indicesCountType } from "meta3d-component-geometry-common-protocol"

export const componentName = "Geometry"

export type config = {
    isDebug: boolean,
    geometryCount: number,
    geometryPointCount: number,
}

export type state = {
    buffer: SharedArrayBuffer,
    config: config
}

export const dataName = {
    vertices: 0,
    normals: 1,
    texCoords: 2,
    tangents: 3,
    indices: 4,
    indicesCount: 5,
}

export type geometry = geometryType

export type vertices = verticesType

export type normals = Float32Array

export type texCoords = Float32Array

export type tangents = Float32Array

export type indices = indicesType

export type indicesCount = indicesCountType