import { allPipelineData as allPipelineDataType } from "meta3d-engine-core-sceneview-protocol/src/contribute/work/PipelineContributeType"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service, fbo } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { service as engineWholeService } from "meta3d-engine-whole-sceneview-protocol/src/service/ServiceType"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { nullable, strictNullable } from "meta3d-commonlib-ts/src/nullable";
import { arcballCameraController } from "meta3d-component-arcballcameracontroller-protocol/src/Index"
// import { gameObject } from "meta3d-gameobject-protocol"

export const pipelineName = "Editor_WebGL1_SceneView1"

export enum pipeline {
    Init = "init",
    Update = "update",
    Render = "render",
}

export enum job {
    InitArcballCameraController = "scene_view1_gl_webgl1_init_arcballcameracontroller_meta3d",
    CreateDefaultScene = "scene_view1_gl_webgl1_create_default_scene_meta3d",
    PrepareFBO = "scene_view1_gl_webgl1_prepare_fbo_meta3d",
    UpdateArcballCameraController = "scene_view1_gl_webgl1_update_arcballcameracontroller_meta3d",
    PrepareStatus = "scene_view1_gl_webgl1_prepare_status_meta3d",
    UseFBO = "scene_view1_gl_webgl1_use_fbo_meta3d"
}

export const allPipelineData: allPipelineDataType = [
    {
        name: pipeline.Init,
        groups: [
            {
                name: "first_webgl1_scene_view1_meta3d",
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
        first_group: "first_webgl1_scene_view1_meta3d"
    },
    {
        name: pipeline.Update,
        groups: [
            {
                name: "first_webgl1_scene_view1_meta3d",
                link: "concat",
                elements: [
                    {
                        "name": job.PrepareFBO,
                        "type_": "job"
                    },
                    {
                        "name": job.UpdateArcballCameraController,
                        "type_": "job"
                    },
                ]
            }
        ],
        first_group: "first_webgl1_scene_view1_meta3d"
    },
    {
        name: pipeline.Render,
        groups: [
            {
                name: "first_webgl1_scene_view1_meta3d",
                link: "concat",
                elements: [
                    {
                        "name": job.UseFBO,
                        "type_": "job"
                    },
                    {
                        "name": job.PrepareStatus,
                        "type_": "job"
                    },
                ]
            }
        ],
        first_group: "first_webgl1_scene_view1_meta3d"
    }
]

export type state = {
    mostService: mostService,
    webgl1Service: webgl1Service,
    uiService: uiService,
    eventService: eventService,
    engineWholeService: engineWholeService,

    canvas: HTMLCanvasElement,
    // cameraGameObject: nullable<gameObject>,
    // arcballCameraController: nullable<arcballCameraController>,
    lastYaw: nullable<number>,
    lastPitch: nullable<number>,
    fbo: strictNullable<fbo>,
}

export type states = {
    [pipelineName]: state
}
