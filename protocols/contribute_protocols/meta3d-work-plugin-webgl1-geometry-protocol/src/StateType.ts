import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service, buffer } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { service as immutableService } from "meta3d-immutable-protocol/src/service/ServiceType"
import { workPluginName as dataWorkPluginName, state as dataState } from "meta3d-work-plugin-webgl1-data-protocol/src/StateType"
import { map } from "meta3d-immutable-protocol/src/service/MapType"

export const workPluginName = "WebGL1_Geometry"

export type verticesVBOMap = map<number, buffer>;
export type indicesVBOMap = map<number, buffer>;


export type state = {
    mostService: mostService,
    webgl1Service: webgl1Service,
    engineCoreService: engineCoreService,
    immutableService: immutableService,
    vbo: {
        verticesVBOMap: verticesVBOMap,
        indicesVBOMap: indicesVBOMap
    },
    // TODO remove
    workPluginWhichHasAllGeometryIndicesName: string,
}

export type workPluginWhichHasAllGeometryIndicesState = {
    allGeometryIndices: number[]
}

export type states = {
    [workPluginWhichHasAllGeometryIndicesName: string]: workPluginWhichHasAllGeometryIndicesState | dataState | state,
    [dataWorkPluginName]: dataState,
    [workPluginName]: state
}
