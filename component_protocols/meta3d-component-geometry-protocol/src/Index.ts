export const componentName = "Geometry"

export type config = {
    isDebug: boolean,
    geometryCount: number,
    geometryPointCount: number,
}

export const dataName = {
    vertices: 0,
    normals: 1,
    texCoords: 2,
    tangents: 3,
    indices: 4,
    indicesCount: 5,
}

export type geometry = number

export type vertices = Float32Array

export type normals = Float32Array

export type texCoords = Float32Array

export type tangents = Float32Array

export type indices = Uint32Array

export type indicesCount = number