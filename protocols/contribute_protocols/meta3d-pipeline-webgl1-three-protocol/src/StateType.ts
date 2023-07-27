import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { service as converterService } from "meta3d-scenegraph-converter-three-protocol/src/service/ServiceType"
import type { WebGLRenderer } from "three"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const pipelineName = "WebGL1_Three"

export type state = {
    mostService: mostService,
    uiService: uiService,
    converterService: converterService,

    renderer: nullable<WebGLRenderer>,
    canvas: HTMLCanvasElement
}

export type states = {
    [pipelineName]: state,
}
