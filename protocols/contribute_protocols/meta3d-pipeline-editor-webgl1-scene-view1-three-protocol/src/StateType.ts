import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { pipelineName as threePipelineName, state as threeState } from "meta3d-pipeline-webgl1-three-protocol/src/StateType"

export const pipelineName = "Editor_WebGL1_SceneView1_THREE"

export type state = {
    mostService: mostService
}

export type states = {
    [pipelineName]: state,
    [threePipelineName]: threeState
}
