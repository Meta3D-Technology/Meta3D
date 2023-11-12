import { allPipelineData as allPipelineDataType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { mostService } from "meta3d-core-protocol/src/service/ServiceType"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { service as converterService } from "meta3d-scenegraph-converter-three-protocol/src/service/ServiceType"
import { service as threeAPIService } from "meta3d-three-api-protocol/src/service/ServiceType"
import type { WebGLRenderer } from "three"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
// import { EffectComposer } from "./EffectComposer"

export const pipelineName = "WebGL1_Three_Gameviewrender"

export enum pipeline {
    Init = "init",
    Render = "render",
}

export enum job {
    ConvertSceneGraph = "convert_scenegraph_three_gameviewrender_meta3d",
    Init = "init_three_gameviewrender_meta3d",
    Render = "render_three_gameviewrender_meta3d",

    InitArcballCameraController = "init_arcballcameracontroller_three_gameviewrender_meta3d",
    CreateDefaultScene = "create_default_scene_three_gameviewrender_meta3d",
    UpdateCameraAspect = "update_camera_aspect_three_gameviewrender_meta3d",
    UpdateArcballCameraController = "update_arcballcameracontroller_three_gameviewrender_meta3d",
    BindEventOnce = "bind_event_once_three_gameviewrender_meta3d",
    Reset = "reset_three_gameviewrender_meta3d",
    HandlePipelineStatus = "handle_pipeline_status_three_gameviewrender_meta3d",
}

export const allPipelineData: allPipelineDataType = [
    {
        name: pipeline.Init,
        groups: [
            {
                name: "first_three_gameviewrender_meta3d",
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
                        "name": job.CreateDefaultScene,
                        "type_": "job"
                    },

                ]
            }
        ],
        first_group: "first_three_gameviewrender_meta3d"
    },
    {
        name: pipeline.Render,
        groups: [
            {
                name: "first_three_gameviewrender_meta3d",
                link: "concat",
                elements: [
                    {
                        "name": job.BindEventOnce,
                        "type_": "job"
                    },
                    {
                        "name": job.UpdateCameraAspect,
                        "type_": "job"
                    },
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
                    {
                        "name": job.Reset,
                        "type_": "job"
                    },
                    {
                        "name": job.HandlePipelineStatus,
                        "type_": "job"
                    },
                ]
            }
        ],
        first_group: "first_three_gameviewrender_meta3d"
    },
]

type composer = any

type renderPass = any

export type state = {
    mostService: mostService,
    eventService: eventService,
    uiService: uiService,
    converterService: converterService,
    threeAPIService: threeAPIService,

    renderer: nullable<WebGLRenderer>,
    composer: nullable<composer>
    renderPass: nullable<renderPass>
    canvas: HTMLCanvasElement,
    lastYaw: nullable<number>,
    lastPitch: nullable<number>,
    isBinded: boolean,
}

export type states = {
    [pipelineName]: state,
}
