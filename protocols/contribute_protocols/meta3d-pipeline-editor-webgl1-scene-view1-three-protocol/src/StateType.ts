import { allPipelineData as allPipelineDataType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { pipelineName as threePipelineName, state as threeState } from "meta3d-pipeline-webgl1-three-protocol/src/StateType"

export const pipelineName = "Editor_WebGL1_SceneView1_THREE"

export enum pipeline {
    Render = "render",
}

export enum job {
    Reset = "scene_view1_three_gl_webgl1_reset_meta3d",
}

export const allPipelineData: allPipelineDataType = [
    {
        name: pipeline.Render,
        groups: [
            {
                name: "first_webgl1_scene_view1_three_meta3d",
                link: "concat",
                elements: [
                    {
                        "name": job.Reset,
                        "type_": "job"
                    },
                ]
            }
        ],
        first_group: "first_webgl1_scene_view1_three_meta3d"
    }
]

export type state = {
    mostService: mostService
}

export type states = {
    [pipelineName]: state,
    [threePipelineName]: threeState
}
