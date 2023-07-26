import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { pipelineName as geometryPipelineName, state as geometryState } from "meta3d-pipeline-webgl1-geometry-protocol/src/StateType"
import { pipelineName as materialPipelineName, state as materialState } from "meta3d-pipeline-webgl1-material-protocol/src/StateType"
import { viewMatrix, pMatrix } from "meta3d-pipeline-webgl1-senduniformshaderdata-protocol/src/StateType"
// import { allRenderComponents } from "meta3d-pipeline-webgl1-render-protocol/src/StateType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { webgl1Context } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { transform } from "meta3d-component-transform-protocol-common"
import { geometry } from "meta3d-component-geometry-protocol-common"
import { pbrMaterial } from "meta3d-component-pbrmaterial-protocol-common"

export const pipelineName = "WebGL1_Data"

export type allRenderComponents = Array<{ transform: transform, geometry: geometry, material: pbrMaterial }>

export type state = {
    isDebug: boolean,
    mostService: mostService,
    engineCoreService: engineCoreService,
    gl: nullable<webgl1Context>,
    allGeometryIndices: number[],
    allMaterialIndices: number[],
    viewMatrix: nullable<viewMatrix>,
    pMatrix: nullable<pMatrix>,
    allRenderComponents: allRenderComponents
}

export type states = {
    [pipelineName]: state,
    [geometryPipelineName]: geometryState,
    [materialPipelineName]: materialState
}
