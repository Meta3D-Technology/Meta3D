import { allPipelineData as allPipelineDataType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { pipelineName as dataPipelineName, state as dataState } from "meta3d-pipeline-webgl1-data-protocol/src/StateType"

export const pipelineName = "WebGL1_CreateGL"

export enum pipeline {
    Init = "init",
}

export enum job {
    CreateGL = "create_gl_webgl1_creategl_meta3d",
}

export const allPipelineData: allPipelineDataType = [
    {
        name: pipeline.Init,
        groups: [
            {
                name: "first_webgl1_creategl_meta3d",
                link: "concat",
                elements: [
                    {
                        "name": job.CreateGL,
                        "type_": "job"
                    },
                ]
            }
        ],
        first_group: "first_webgl1_creategl_meta3d"
    }
]

export type state = {
    mostService: mostService,
    webgl1Service: webgl1Service,
    canvas: HTMLCanvasElement
}

export type states = {
    [dataPipelineName]: dataState,
    [pipelineName]: state,
}
