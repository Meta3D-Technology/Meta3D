import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { map } from "meta3d-immutable-protocol/src/service/MapType";
import { service as registerECSWorkerService } from "meta3d-register-ecs-worker-protocol/src/service/ServiceType"
import { service as immutableService } from "meta3d-immutable-protocol/src/service/ServiceType"
import { workPluginName as createGLWorkPluginName, state as createGLState } from "meta3d-work-plugin-webgl1-creategl-protocol"
import { workPluginName as geometryWorkPluginName, state as geometryState } from "meta3d-work-plugin-webgl1-geometry-protocol"

export const workPluginName = "engine-work-plugin-webgl1-worker-render"

export type config = {
    isDebug: boolean,
    mostService: mostService,
    webgl1Service: webgl1Service,
    engineCoreService: engineCoreService,
    registerECSService: registerECSWorkerService,
    immutableService: immutableService
}

export type verticesVBOMap = map<number, WebGLBuffer>;
export type indicesVBOMap = map<number, WebGLBuffer>;
export type programMap = map<number, WebGLProgram>;

export type state = {
    isDebug: boolean,
    mostService: mostService,
    webgl1Service: webgl1Service,
    engineCoreService: engineCoreService,
    registerECSService: registerECSWorkerService,
    immutableService: immutableService,
    canvas: nullable<OffscreenCanvas>,
    material: {
        programMap: programMap
    },
    viewMatrix: nullable<Float32Array>,
    pMatrix: nullable<Float32Array>,
    allGeometryIndices: number[],
    allMaterialIndices: number[],
    transformCount: nullable<number>,
    geometryCount: nullable<number>,
    geometryPointCount: nullable<number>,
    pbrMaterialCount: nullable<number>,
    transformBuffer: nullable<SharedArrayBuffer>,
    geometryBuffer: nullable<SharedArrayBuffer>,
    pbrMaterialBuffer: nullable<SharedArrayBuffer>,
    typeArray: nullable<Uint32Array>,
    renderGameObjectsCount: number
}

export type states = {
    [workPluginName]: state,
    [createGLWorkPluginName]: createGLState,
    [geometryWorkPluginName]: geometryState
}
