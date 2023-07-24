import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { service as immutableService } from "meta3d-immutable-protocol/src/service/ServiceType"
import { pipelineName as dataPipelineName, state as dataState } from "meta3d-pipeline-webgl1-data-protocol/src/StateType"
import { pipelineName as materialPipelineName, state as materialState } from "meta3d-pipeline-webgl1-material-protocol/src/StateType"
import { pipelineName as geometryPipelineName, state as geometryState } from "meta3d-pipeline-webgl1-geometry-protocol/src/StateType"
// import { transform } from "meta3d-component-transform-protocol-common"
// import { geometry } from "meta3d-component-geometry-protocol-common"
// import { pbrMaterial } from "meta3d-component-pbrmaterial-protocol-common"

export const pipelineName = "WebGL1_Render"

export type state = {
    mostService: mostService,
    webgl1Service: webgl1Service,
    engineCoreService: engineCoreService,
    immutableService: immutableService,
}

// export type allRenderComponents = Array<{ transform: transform, geometry: geometry, material: pbrMaterial }>

// export type pipelineWhichHasAllRenderComponentsState = {
//     allRenderComponents: allRenderComponents
// }

export type states = {
    // [pipelineWhichHasAllRenderComponentsName: string]: pipelineWhichHasAllRenderComponentsState | dataState | materialState | state,
    [dataPipelineName]: dataState,
    [geometryPipelineName]: geometryState,
    [materialPipelineName]: materialState,
    [pipelineName]: state
}
