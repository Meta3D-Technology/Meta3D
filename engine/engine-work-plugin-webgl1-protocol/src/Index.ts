import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { service as immutableService } from "meta3d-immutable-protocol/src/service/ServiceType"
import { workPluginName as createGLWorkPluginName, state as createGLState } from "meta3d-work-plugin-webgl1-creategl-protocol"
import { workPluginName as geometryWorkPluginName, state as geometryState } from "meta3d-work-plugin-webgl1-geometry-protocol"
import { workPluginName as materialWorkPluginName, state as materialState } from "meta3d-work-plugin-webgl1-material-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { transform } from "meta3d-component-transform-protocol"
import { geometry } from "meta3d-component-geometry-protocol"
import { pbrMaterial } from "meta3d-component-pbrmaterial-protocol"
import {viewMatrix, pMatrix} from "meta3d-work-plugin-webgl1-senduniformshaderdata-protocol"

export const workPluginName = "engine-work-plugin-webgl1"

export type state = {
    isDebug: boolean,
    mostService: mostService,
    webgl1Service: webgl1Service,
    engineCoreService: engineCoreService,
    immutableService: immutableService,
    canvas: HTMLCanvasElement,
    allGeometryIndices: number[],
    allMaterialIndices: number[],
    viewMatrix: nullable<viewMatrix>,
    pMatrix: nullable<pMatrix>,
    // TODO duplicate with meta3d-work-plugin-webgl1-render-protocol->Index.ts
    allRenderComponents: Array<{ transform: transform, geometry: geometry, material: pbrMaterial }>
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