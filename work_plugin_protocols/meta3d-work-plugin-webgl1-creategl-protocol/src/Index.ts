import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable";

export const workPluginName = "WebGL1_CreateGL"

export type state = {
    mostService: mostService,
    webgl1Service: webgl1Service,
    canvas: HTMLCanvasElement,
    gl: nullable<WebGLRenderingContext>,
}

export type states = { "WebGL1_CreateGL": state }

export type config = {
    mostService: mostService,
    webgl1Service: webgl1Service,
    canvas: HTMLCanvasElement
}