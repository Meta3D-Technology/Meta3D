import { allPipelineData as allPipelineDataType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { mostService } from "meta3d-core-protocol/src/service/ServiceType"
import { converterService, threeAPIService } from "meta3d-three-protocol/src/service/ServiceType"
import type { WebGLRenderer } from "three"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
// import { EffectComposer } from "./EffectComposer"

export const pipelineName = "WebGL1_Three_Gameviewrender"

export enum pipeline {
    Init = "init",
    Render = "render",
}

export enum job {
    ConvertSceneGraph = "convert_scenegraph_three_webrender_meta3d",
    Init = "init_three_webrender_meta3d",
    Render = "render_three_webrender_meta3d",

    CreateDefaultScene = "create_default_scene_three_webrender_meta3d"
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
                        "name": job.CreateDefaultScene,
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
    converterService: converterService,
    threeAPIService: threeAPIService,

    renderer: nullable<WebGLRenderer>,
    composer: nullable<composer>
    renderPass: nullable<renderPass>
    canvas: HTMLCanvasElement,
}

export type states = {
    [pipelineName]: state,
}
