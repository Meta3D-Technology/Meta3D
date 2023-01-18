import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { workPluginName as dataWorkPluginName, state as dataState } from "meta3d-work-plugin-webgl1-data-protocol/src/StateType"

export const workPluginName = "WebGL1_CreateGL"

export type state = {
    mostService: mostService,
    webgl1Service: webgl1Service,
    canvas: HTMLCanvasElement
}

export type states = {
    [dataWorkPluginName]: dataState,
    [workPluginName]: state,
}
