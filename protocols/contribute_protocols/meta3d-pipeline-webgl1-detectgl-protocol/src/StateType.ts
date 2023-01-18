import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { pipelineName as dataPipelineName, state as dataState } from "meta3d-pipeline-webgl1-data-protocol/src/StateType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"

export const pipelineName = "WebGL1_DetectGL"

export type state = {
    mostService: mostService,
    webgl1Service: webgl1Service
}

export type states = {
    [dataPipelineName]: dataState,
    [pipelineName]: state
}
