export const componentName = "GeometryWorker"

export type config = {
    isDebug: boolean,
    geometryCount: number,
    geometryPointCount: number,
    buffer: SharedArrayBuffer
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