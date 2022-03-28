import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { service as immutableService } from "meta3d-immutable-protocol/src/service/ServiceType"
import { map } from "meta3d-immutable-protocol/src/service/MapType";
import { workPluginName as createGLWorkPluginName, state as createGLState } from "meta3d-work-plugin-webgl1-creategl-protocol"
import { workPluginName as geometryWorkPluginName, state as geometryState } from "meta3d-work-plugin-webgl1-geometry-protocol"
import { workPluginName as materialWorkPluginName, state as materialState } from "meta3d-work-plugin-webgl1-material-protocol"

export const workPluginName = "engine-work-plugin-webgl1"

export type state = {
    isDebug: boolean,
    mostService: mostService,
    webgl1Service: webgl1Service,
    engineCoreService: engineCoreService,
    immutableService: immutableService,
    canvas: HTMLCanvasElement,
    allGeometryIndices: number[],
    allMaterialIndices: number[]
}

export type states = {
    [workPluginName]: state,
    [createGLWorkPluginName]: createGLState,
    [geometryWorkPluginName]: geometryState,
    [materialWorkPluginName]: materialState
}

export type config = {
    isDebug: boolean,
    mostService: mostService,
    webgl1Service: webgl1Service,
    engineCoreService: engineCoreService,
    immutableService: immutableService,
    canvas: HTMLCanvasElement
}