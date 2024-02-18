import { allPipelineData as allPipelineDataType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { mostService } from "meta3d-core-protocol/src/service/ServiceType"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { converterService, threeAPIService } from "meta3d-three-protocol/src/service/ServiceType"
import type { WebGLRenderer } from "three"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
// import { EffectComposer } from "./EffectComposer"

export const pipelineName = "WebGL1_Three_webrender"

export enum pipeline {
    Init = "init",
    Update = "update",
    Render = "render",
}

export enum job {
    ConvertSceneGraph = "convert_scenegraph_three_webrender_meta3d",
    Init = "init_three_webrender_meta3d",
    InitArcballCameraController = "init_arcballcameracontroller_three_webrender_meta3d",
    UpdateArcballCameraController = "update_arcballcameracontroller_three_webrender_meta3d",
    BindEvent = "bind_event_three_webrender_meta3d",


    InitScript = "init_script_three_webrender_meta3d",

    UpdateScript = "update_script_three_webrender_meta3d",

    Render = "render_three_webrender_meta3d",
}

export const allPipelineData: allPipelineDataType = [
    {
        name: pipeline.Init,
        groups: [
            {
                name: "first_three_webrender_meta3d",
                link: "concat",
                elements: [
                    {
                        "name": job.Init,
                        "type_": "job"
                    },
                    {
                        "name": job.InitArcballCameraController,
                        "type_": "job"
                    },
                    {
                        "name": job.BindEvent,
                        "type_": "job"
                    },
                    {
                        "name": job.InitScript,
                        "type_": "job"
                    },
                ]
            }
        ],
        first_group: "first_three_webrender_meta3d"
    },
    {
        name: pipeline.Update,
        groups: [
            {
                name: "first_three_webrender_meta3d",
                link: "concat",
                elements: [
                    {
                        "name": job.UpdateScript,
                        "type_": "job"
                    },
                ]
            }
        ],
        first_group: "first_three_webrender_meta3d"
    },
    {
        name: pipeline.Render,
        groups: [
            {
                name: "first_three_webrender_meta3d",
                link: "concat",
                elements: [
                    {
                        "name": job.UpdateArcballCameraController,
                        "type_": "job"
                    },
                    {
                        "name": job.ConvertSceneGraph,
                        "type_": "job"
                    },
                    {
                        "name": job.Render,
                        "type_": "job"
                    },
                ]
            }
        ],
        first_group: "first_three_webrender_meta3d"
    },
]

type composer = any

type renderPass = any

export type state = {
    mostService: mostService,
    eventService: eventService,
    converterService: converterService,
    threeAPIService: threeAPIService,

    renderer: nullable<WebGLRenderer>,
    composer: nullable<composer>
    renderPass: nullable<renderPass>
    canvas: HTMLCanvasElement,
    lastYaw: nullable<number>,
    lastPitch: nullable<number>,
}

export type states = {
    [pipelineName]: state,
}
