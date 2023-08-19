import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { allPipelineData as allPipelineDataType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { pipelineName as dataPipelineName, state as dataState } from "meta3d-pipeline-webgl1-data-protocol/src/StateType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"

export const pipelineName = "WebGL1_DetectGL"

export enum pipeline {
    Init = "init",
}

export enum job {
    DetectGL = "detect_gl_webgl1_detectgl_meta3d",
}

export const allPipelineData: allPipelineDataType = [
    {
        name: pipeline.Init,
        groups: [
            {
                name: "first_webgl1_detectgl_meta3d",
                link: "concat",
                elements: [
                    {
                        "name": job.DetectGL,
                        "type_": "job"
                    },
                ]
            }
        ],
        first_group: "first_webgl1_detectgl_meta3d"
    }
]

export type state = {
    mostService: mostService,
    webgl1Service: webgl1Service
}

export type states = {
    [dataPipelineName]: dataState,
    [pipelineName]: state
}
