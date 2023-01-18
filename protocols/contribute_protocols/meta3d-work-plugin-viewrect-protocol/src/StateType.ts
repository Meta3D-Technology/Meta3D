import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { workPluginName as dataWorkPluginName, state as dataState } from "meta3d-work-plugin-webgl1-data-protocol/src/StateType"
// import { workPluginName as createglWorkPluginName, state as createglState } from "meta3d-work-plugin-webgl1-creategl-protocol/src/StateType"

export const workPluginName = "ViewRect"

export type state = {
    mostService: mostService,
    canvas: HTMLCanvasElement
}

export type states = {
    [dataWorkPluginName]: dataState,
    // [createglWorkPluginName]: createglState,
    [workPluginName]: state,
}