import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { service as immutableService } from "meta3d-immutable-protocol/src/service/ServiceType"
import { workPluginName as createGLWorkPluginName, state as createGLState } from "meta3d-work-plugin-webgl1-creategl-protocol"
import { map } from "meta3d-immutable-protocol/src/service/MapType"

export const workPluginName = "WebGL1_Geometry"

export type verticesVBOMap = map<number, WebGLBuffer>;
export type indicesVBOMap = map<number, WebGLBuffer>;

export type vbo = {
    verticesVBOMap: verticesVBOMap,
    indicesVBOMap: indicesVBOMap
}

export type geometryData = {
    componentName: string,
    verticesDataName: number,
    indicesDataName: number,
}

export type state = {
    mostService: mostService,
    webgl1Service: webgl1Service,
    engineCoreService: engineCoreService,
    immutableService: immutableService,
    vbo: vbo,
    workPluginWhichHasAllGeometryIndicesName: string,
    geometryData: geometryData
}

export type workPluginWhichHasAllGeometryIndicesState = {
    allGeometryIndices: number[]
}

export type states = {
    [workPluginWhichHasAllGeometryIndicesName: string]: workPluginWhichHasAllGeometryIndicesState | createGLState | state,
    [createGLWorkPluginName]: createGLState,
    [workPluginName]: state
}

export type config = {
    mostService: mostService,
    webgl1Service: webgl1Service,
    engineCoreService: engineCoreService,
    immutableService: immutableService,
    workPluginWhichHasAllGeometryIndicesName: string,
    geometryData: geometryData
}