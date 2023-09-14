import { allPipelineData as allPipelineDataType } from "meta3d-engine-core-sceneview-protocol/src/contribute/work/PipelineContributeType"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"

export const pipelineName = "Dispose_SceneView"

export enum pipeline {
    Update = "update",
}

export enum job {
    Dispose = "dispose_dispose_meta3d",
}

export const allPipelineData: allPipelineDataType = [
    {
        name: pipeline.Update,
        groups: [
            {
                name: "first_dispose_meta3d",
                link: "concat",
                elements: [
                    {
                        "name": job.Dispose,
                        "type_": "job"
                    },
                ]
            }
        ],
        first_group: "first_dispose_meta3d"
    }
]

export type state = {
    mostService: mostService
}

export type states = {
    [pipelineName]: state
}
