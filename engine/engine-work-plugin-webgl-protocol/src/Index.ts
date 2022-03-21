import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"

export const workPluginName = "WebGL1"

export type state = {
    mostService: mostService,
    webgl1Service: webgl1Service,
    canvas: HTMLCanvasElement,
    gl: WebGLRenderingContext | null
}

export type states = { "WebGL1": state }

export type config = {
    mostService: mostService,
    webgl1Service: webgl1Service,
    canvas: HTMLCanvasElement
}