import { allPipelineData as allPipelineDataType } from "meta3d-engine-core-sceneview-protocol/src/contribute/work/PipelineContributeType"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { service as webgpuService, device, renderPipeline, context } from "meta3d-webgpu-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const pipelineName = "WebGPU_Triangle"

export enum pipeline {
    Init = "init",
    Render = "render",
}

export enum job {
    Init = "init_webgpu_triangle_meta3d",
    Render = "render_webgpu_triangle_meta3d",
}

export const allPipelineData: allPipelineDataType = [
    {
        name: pipeline.Init,
        groups: [
            {
                name: "first_triangle_meta3d",
                link: "concat",
                elements: [
                    {
                        "name": job.Init,
                        "type_": "job"
                    }
                ]
            }
        ],
        first_group: "first_triangle_meta3d"
    },
    {
        name: pipeline.Render,
        groups: [
            {
                name: "first_triangle_meta3d",
                link: "concat",
                elements: [
                    {
                        "name": job.Render,
                        "type_": "job"
                    },
                ]
            }
        ],
        first_group: "first_triangle_meta3d"
    }
]

export type state = {
    mostService: mostService,
    uiService: uiService,
    webgpuService: webgpuService,
    device: nullable<device>,
    context: nullable<context>,
    renderPipeline: nullable<renderPipeline>,
}

export type states = {
    [pipelineName]: state
}
