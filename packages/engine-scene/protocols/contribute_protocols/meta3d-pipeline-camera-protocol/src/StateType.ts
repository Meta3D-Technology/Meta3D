import { allPipelineData as allPipelineDataType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { mostService, engineCoreService } from "meta3d-core-protocol/src/service/ServiceType"
// import { pipelineName as viewRectPipelineName, state as viewRectState } from "meta3d-pipeline-viewRect-protocol/src/StateType"

export const pipelineName = "Camera"

export enum pipeline {
    Update = "update",
}

export enum job {
    UpdateCamera = "update_camera_camera_meta3d",
}

export const allPipelineData: allPipelineDataType = [
    {
        name: pipeline.Update,
        groups: [
            {
                name: "first_camera_meta3d",
                link: "concat",
                elements: [
                    {
                        "name": job.UpdateCamera,
                        "type_": "job"
                    },
                ]
            }
        ],
        first_group: "first_camera_meta3d"
    }
]

export type state = {
    mostService: mostService,
    engineCoreService: engineCoreService,
    isDebug: boolean
}

export type states = {
    [pipelineName]: state,
    // [viewRectPipelineName]: viewRectState,
}
