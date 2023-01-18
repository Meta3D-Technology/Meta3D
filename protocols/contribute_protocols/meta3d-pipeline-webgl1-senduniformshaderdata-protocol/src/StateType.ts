import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { pipelineName as dataPipelineName, state as dataState } from "meta3d-pipeline-webgl1-data-protocol/src/StateType"
import { pipelineName as materialPipelineName, state as materialState } from "meta3d-pipeline-webgl1-material-protocol/src/StateType"
// import { nullable } from "meta3d-commonlib-ts/src/nullable";

export const pipelineName = "WebGL1_SendUniformShaderData"

export type state = {
    mostService: mostService,
    webgl1Service: webgl1Service,
    // pipelineWhichHasUniformShaderDataName: string,
}

export type viewMatrix = Float32Array

export type pMatrix = Float32Array

// export type pipelineWhichHasUniformShaderDataState = {
//     viewMatrix: nullable<viewMatrix>,
//     pMatrix: nullable<pMatrix>,
// }

export type states = {
    // [pipelineWhichHasUniformShaderDataName: string]: pipelineWhichHasUniformShaderDataState | dataState | materialState | state,
    [dataPipelineName]: dataState,
    [materialPipelineName]: materialState,
    [pipelineName]: state
}
