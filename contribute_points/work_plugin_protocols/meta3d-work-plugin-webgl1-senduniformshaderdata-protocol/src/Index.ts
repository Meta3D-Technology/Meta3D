import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { workPluginName as createGLWorkPluginName, state as createGLState } from "meta3d-work-plugin-webgl1-creategl-protocol"
import { workPluginName as materialWorkPluginName, state as materialState } from "meta3d-work-plugin-webgl1-material-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const workPluginName = "WebGL1_SendUniformShaderData"

export type state = {
    mostService: mostService,
    webgl1Service: webgl1Service,
    workPluginWhichHasUniformShaderDataName: string,
}

export type viewMatrix = Float32Array

export type pMatrix = Float32Array

export type workPluginWhichHasUniformShaderDataState = {
    viewMatrix: nullable<viewMatrix>,
    pMatrix: nullable<pMatrix>,
}

export type states = {
    [workPluginWhichHasUniformShaderDataName: string]: workPluginWhichHasUniformShaderDataState | createGLState | materialState | state,
    [createGLWorkPluginName]: createGLState,
    [materialWorkPluginName]: materialState,
    [workPluginName]: state
}

export type config = {
    mostService: mostService,
    webgl1Service: webgl1Service,
    workPluginWhichHasUniformShaderDataName: string,
}