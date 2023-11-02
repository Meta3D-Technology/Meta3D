import { allPipelineData as allPipelineDataType } from "meta3d-engine-core-sceneview-protocol/src/contribute/work/PipelineContributeType"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { service as converterService } from "meta3d-scenegraph-converter-three-sceneview-protocol/src/service/ServiceType"
import { service as threeAPIService } from "meta3d-three-api-protocol/src/service/ServiceType"
import type { WebGLRenderer } from "three"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
// import { EffectComposer } from "./EffectComposer"

export const pipelineName = "WebGL1_Three_SceneView"

export enum pipeline {
    Init = "init",
    Update = "update",
    Render = "render",
}

export enum job {
    ConvertSceneGraph = "convert_scenegraph_three_meta3d",
    Init = "init_three_meta3d",
    Render = "render_three_meta3d",
}

export const allPipelineData: allPipelineDataType = [
    {
        name: pipeline.Init,
        groups: [
            {
                name: "first_three_meta3d",
                link: "concat",
                elements: [
                    {
                        "name": job.Init,
                        "type_": "job"
                    },
                ]
            }
        ],
        first_group: "first_three_meta3d"
    },
    {
        name: pipeline.Update,
        groups: [
            {
                name: "first_three_meta3d",
                link: "concat",
                elements: [
                    {
                        "name": job.ConvertSceneGraph,
                        "type_": "job"
                    },
                ]
            },
        ],
        first_group: "first_three_meta3d"
    },
    {
        name: pipeline.Render,
        groups: [
            {
                name: "first_three_meta3d",
                link: "concat",
                elements: [
                    {
                        "name": job.Render,
                        "type_": "job"
                    },
                ]
            }
        ],
        first_group: "first_three_meta3d"
    },
]

type composer  = any

type renderPass  = any

export type state = {
    mostService: mostService,
    uiService: uiService,
    converterService: converterService,
    threeAPIService: threeAPIService,

    renderer: nullable<WebGLRenderer>,
    composer: nullable<composer>
    renderPass: nullable<renderPass>
    canvas: HTMLCanvasElement
}

export type states = {
    [pipelineName]: state,
}
