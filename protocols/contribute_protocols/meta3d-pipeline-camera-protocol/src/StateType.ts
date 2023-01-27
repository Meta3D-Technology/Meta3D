import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { pipelineName as dataPipelineName, state as dataState } from "meta3d-pipeline-webgl1-data-protocol/src/StateType"

export const pipelineName = "Camera"

export type state = {
    mostService: mostService,
    engineCoreService: engineCoreService,
    engineSceneService: engineSceneService,
    isDebug: boolean
}

export type states = {
    [pipelineName]: state,
    [dataPipelineName]: dataState,
}
