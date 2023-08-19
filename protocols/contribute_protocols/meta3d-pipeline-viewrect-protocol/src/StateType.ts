import { allPipelineData as allPipelineDataType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const pipelineName = "ViewRect"

export enum pipeline {
    Init = "init",
    Update = "update",
}

export enum job {
    GetViewRectForInit = "get_viewrect_for_init_engine",
    GetViewRectForUpdate = "get_viewrect_for_update_engine",
}

export const allPipelineData: allPipelineDataType = [
    {
        name: pipeline.Init,
        groups: [
            {
                name: "first_engine",
                link: "concat",
                elements: [
                    {
                        "name": job.GetViewRectForInit,
                        "type_": "job"
                    }
                ]
            }
        ],
        first_group: "first_engine"
    },
    {
        name: pipeline.Update,
        groups: [
            {
                name: "first_engine",
                link: "concat",
                elements: [
                    {
                        "name": job.GetViewRectForUpdate,
                        "type_": "job"
                    }
                ]
            }
        ],
        first_group: "first_engine"
    },
]

type viewRect = {
    x: number,
    y: number,
    width: number,
    height: number
}

export type state = {
    mostService: mostService,
    canvas: HTMLCanvasElement,
    viewRect: nullable<viewRect>
}

export type states = {
    [pipelineName]: state,
}