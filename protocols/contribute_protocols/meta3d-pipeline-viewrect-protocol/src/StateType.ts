import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { pipelineName as dataPipelineName, state as dataState } from "meta3d-pipeline-webgl1-data-protocol/src/StateType"
// import { pipelineName as createglPipelineName, state as createglState } from "meta3d-pipeline-webgl1-creategl-protocol/src/StateType"

export const pipelineName = "ViewRect"

export type state = {
    mostService: mostService,
    canvas: HTMLCanvasElement
}

export type states = {
    [dataPipelineName]: dataState,
    // [createglPipelineName]: createglState,
    [pipelineName]: state,
}