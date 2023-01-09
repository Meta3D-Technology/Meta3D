import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { workPluginName as createGLWorkPluginName, state as createGLState } from "meta3d-work-plugin-webgl1-creategl-protocol/src/StateType"
import { workPluginName as geometryWorkPluginName, state as geometryState } from "meta3d-work-plugin-webgl1-geometry-protocol/src/StateType"
import { workPluginName as materialWorkPluginName, state as materialState } from "meta3d-work-plugin-webgl1-material-protocol/src/StateType"
import { viewMatrix, pMatrix } from "meta3d-work-plugin-webgl1-senduniformshaderdata-protocol/src/StateType"
import { allRenderComponents } from "meta3d-work-plugin-webgl1-render-protocol/src/StateType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const workPluginName = "WebGL1_Data"

export type state = {
    isDebug: boolean,
    mostService: mostService,
    engineCoreService: engineCoreService,
    allGeometryIndices: number[],
    allMaterialIndices: number[],
    viewMatrix: nullable<viewMatrix>,
    pMatrix: nullable<pMatrix>,
    allRenderComponents: allRenderComponents
}

export type states = {
    [workPluginName]: state,
    [createGLWorkPluginName]: createGLState,
    [geometryWorkPluginName]: geometryState,
    [materialWorkPluginName]: materialState
}
