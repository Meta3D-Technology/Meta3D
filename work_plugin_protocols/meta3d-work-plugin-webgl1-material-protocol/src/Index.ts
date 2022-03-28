import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { workPluginName as createGLWorkPluginName, state as createGLState } from "meta3d-work-plugin-webgl1-creategl-protocol"

export const workPluginName = "WebGL1_DetectGL"

export type state = {
    mostService: mostService,
    webgl1Service: webgl1Service,
}

export type states = {
    [createGLWorkPluginName]: createGLState,
    [workPluginName]: state
}

export type config = {
    mostService: mostService,
    webgl1Service: webgl1Service,
}