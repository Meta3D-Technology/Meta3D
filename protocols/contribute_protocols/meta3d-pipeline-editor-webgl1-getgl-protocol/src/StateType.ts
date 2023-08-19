import { allPipelineData as allPipelineDataType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { pipelineName as dataPipelineName, state as dataState } from "meta3d-pipeline-webgl1-data-protocol/src/StateType"

export const pipelineName = "Editor_WebGL1_GetGL"

export enum pipeline {
    Init = "init",
}

export enum job {
    GetGL = "get_gl_webgl1_getgl_meta3d",
}

export const allPipelineData: allPipelineDataType = [
    {
        name: pipeline.Init,
        groups: [
            {
                name: "first_webgl1_getgl_meta3d",
                link: "concat",
                elements: [
                    {
                        "name": job.GetGL,
                        "type_": "job"
                    },
                ]
            }
        ],
        first_group: "first_webgl1_getgl_meta3d"
    }
]

export type state = {
    mostService: mostService,
    uiService: uiService
}

export type states = {
    [dataPipelineName]: dataState,
    [pipelineName]: state,
}
