import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { pipelineName as dataPipelineName, state as dataState } from "meta3d-pipeline-webgl1-data-protocol/src/StateType"

export const pipelineName = "Editor_WebGL1_GetGL"

export type state = {
    mostService: mostService,
    uiService: uiService
}

export type states = {
    [dataPipelineName]: dataState,
    [pipelineName]: state,
}
