import { allPipelineData as allPipelineDataType } from "meta3d-engine-core-sceneview-protocol/src/contribute/work/PipelineContributeType"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"

export const pipelineName = "Editor_WebGL1_SceneView2"

export enum pipeline {
    Render = "render",
}

export enum job {
    Restore = "scene_view2_gl_webgl1_restore_meta3d",
}

export const allPipelineData: allPipelineDataType = [
    {
        name: pipeline.Render,
        groups: [
            {
                name: "first_webgl1_scene_view2_meta3d",
                link: "concat",
                elements: [
                    {
                        "name": job.Restore,
                        "type_": "job"
                    },
                ]
            }
        ],
        first_group: "first_webgl1_scene_view2_meta3d"
    }
]

export type state = {
    mostService: mostService,
    webgl1Service: webgl1Service,
    uiService: uiService,
}

export type states = {
    [pipelineName]: state
}
