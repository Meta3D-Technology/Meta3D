import { allPipelineData as allPipelineDataType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { mostService, engineCoreService } from "meta3d-core-protocol/src/service/ServiceType"

export const pipelineName = "Transform"

export enum pipeline {
    Update = "update",
}

export enum job {
    UpdateTransform = "update_transform_transform_meta3d",
}

export const allPipelineData: allPipelineDataType = [
    {
        name: pipeline.Update,
        groups: [
            {
                name: "first_transform_meta3d",
                link: "concat",
                elements: [
                    {
                        "name": job.UpdateTransform,
                        "type_": "job"
                    },
                ]
            }
        ],
        first_group: "first_transform_meta3d"
    }
]

export type state = {
    mostService: mostService,
    engineCoreService: engineCoreService
}

export type states = {
    [pipelineName]: state
}
