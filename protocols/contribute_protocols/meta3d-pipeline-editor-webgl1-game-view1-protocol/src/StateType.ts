import { allPipelineData as allPipelineDataType } from "meta3d-engine-core-gameview-protocol/src/contribute/work/PipelineContributeType"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service, fbo } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { service as engineWholeService } from "meta3d-engine-whole-gameview-protocol/src/service/ServiceType"
import { nullable, strictNullable } from "meta3d-commonlib-ts/src/nullable";

export const pipelineName = "Editor_WebGL1_GameView1"

export enum pipeline {
    Init = "init",
    Update = "update",
    Render = "render",
}

export enum job {
    InitArcballCameraController = "game_view1_gl_webgl1_init_arcballcameracontroller_meta3d",
    CreateDefaultScene = "game_view1_gl_webgl1_create_default_game_meta3d",
    UpdateArcballCameraController = "game_view1_gl_webgl1_update_arcballcameracontroller_meta3d",
    UpdateCameraAspectJob = "game_view1_gl_webgl1_update_camera_aspect_meta3d",
}

export const allPipelineData: allPipelineDataType = [
    {
        name: pipeline.Init,
        groups: [
            {
                name: "first_webgl1_game_view1_meta3d",
                link: "concat",
                elements: [
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
        first_group: "first_webgl1_game_view1_meta3d"
    },
    {
        name: pipeline.Update,
        groups: [
            {
                name: "first_webgl1_game_view1_meta3d",
                link: "concat",
                elements: [
                    {
                        "name": job.UpdateCameraAspectJob,
                        "type_": "job"
                    },
                    {
                        "name": job.UpdateArcballCameraController,
                        "type_": "job"
                    },
                ]
            }
        ],
        first_group: "first_webgl1_game_view1_meta3d"
    },
]

export type state = {
    mostService: mostService,
    webgl1Service: webgl1Service,
    uiService: uiService,
    engineWholeService: engineWholeService,

    canvas: HTMLCanvasElement,
    lastYaw: nullable<number>,
    lastPitch: nullable<number>,
    // fbo: strictNullable<fbo>,
}

export type states = {
    [pipelineName]: state
}
