import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { service as renderDataBufferService } from "meta3d-renderdatabuffer-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as registerECSWorkerService } from "meta3d-register-ecs-worker-protocol/src/service/ServiceType"
import { service as immutableService } from "meta3d-immutable-protocol/src/service/ServiceType"
import { workPluginName as createGLWorkPluginName, state as createGLState } from "meta3d-work-plugin-webgl1-creategl-protocol"
import { workPluginName as geometryWorkPluginName, state as geometryState } from "meta3d-work-plugin-webgl1-geometry-protocol"
import { workPluginName as materialWorkPluginName, state as materialState } from "meta3d-work-plugin-webgl1-material-protocol"
import { transform } from "meta3d-component-transform-worker-protocol"
import { geometry } from "meta3d-component-geometry-worker-protocol"
import { pbrMaterial } from "meta3d-component-pbrmaterial-worker-protocol"
import { renderDataBufferTypeArray as renderDataBufferTypeArrayType } from "meta3d-work-plugin-renderdatabuffer-protocol"

export const workPluginName = "engine-work-plugin-webgl1-worker-render"

export type config = {
    isDebug: boolean,
    mostService: mostService,
    webgl1Service: webgl1Service,
    engineCoreService: engineCoreService,
    renderDataBufferService: renderDataBufferService,
    registerECSService: registerECSWorkerService,
    immutableService: immutableService
}

export type renderDataBufferTypeArray = renderDataBufferTypeArrayType

export type state = {
    isDebug: boolean,
    mostService: mostService,
    renderDataBufferService: renderDataBufferService,
    webgl1Service: webgl1Service,
    engineCoreService: engineCoreService,
    registerECSService: registerECSWorkerService,
    immutableService: immutableService,
    canvas: nullable<OffscreenCanvas>,
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
    renderDataBufferTypeArray: nullable<renderDataBufferTypeArray>,
    renderGameObjectsCount: number,
    // TODO duplicate with meta3d-work-plugin-webgl1-render-protocol->Index.ts
    allRenderComponents: Array<{ transform: transform, geometry: geometry, material: pbrMaterial }>
}

export type states = {
    [workPluginName]: state,
    [createGLWorkPluginName]: createGLState,
    [geometryWorkPluginName]: geometryState,
    [materialWorkPluginName]: materialState
}
