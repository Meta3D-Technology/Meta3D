import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { pipelineName as viewRectPipelineName, state as viewRectState } from "meta3d-pipeline-viewRect-protocol/src/StateType"

export const pipelineName = "Camera"

export type state = {
    mostService: mostService,
    engineCoreService: engineCoreService,
    isDebug: boolean
}

export type states = {
    [pipelineName]: state,
    [viewRectPipelineName]: viewRectState,
}
