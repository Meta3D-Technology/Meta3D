import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { workPluginName as geometryWorkPluginName, state as geometryState } from "meta3d-work-plugin-webgl1-geometry-protocol/src/StateType"
import { workPluginName as materialWorkPluginName, state as materialState } from "meta3d-work-plugin-webgl1-material-protocol/src/StateType"
import { viewMatrix, pMatrix } from "meta3d-work-plugin-webgl1-senduniformshaderdata-protocol/src/StateType"
import { allRenderComponents } from "meta3d-work-plugin-webgl1-render-protocol/src/StateType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { webgl1Context } from "meta3d-webgl1-protocol/src/service/ServiceType"

export const workPluginName = "WebGL1_Data"

type viewRect = {
    x: number,
    y: number,
    width: number,
    height: number
}

export type state = {
    isDebug: boolean,
    mostService: mostService,
    engineCoreService: engineCoreService,
    gl: nullable<webgl1Context>,
    allGeometryIndices: number[],
    allMaterialIndices: number[],
    viewRect: nullable<viewRect>,
    viewMatrix: nullable<viewMatrix>,
    pMatrix: nullable<pMatrix>,
    allRenderComponents: allRenderComponents
}

export type states = {
    [workPluginName]: state,
    [geometryWorkPluginName]: geometryState,
    [materialWorkPluginName]: materialState
}
