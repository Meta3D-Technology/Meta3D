import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable";

export const workPluginName = "WebGL1_CreateGL"

export type state = {
    mostService: mostService,
    webgl1Service: webgl1Service,
    workPluginWhichHasCanvasName: string
    gl: nullable<WebGLRenderingContext>,
}

export type workPluginWhichHasCanvasState = {
    canvas: HTMLCanvasElement
}

export type states = {
    [workPluginWhichHasCanvasName: string]: workPluginWhichHasCanvasState | state,
    [workPluginName]: state
}

export type config = {
    mostService: mostService,
    webgl1Service: webgl1Service,
    workPluginWhichHasCanvasName: string
}