import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { workPluginName as dataWorkPluginName, state as dataState } from "meta3d-work-plugin-webgl1-data-protocol/src/StateType"

export const workPluginName = "Editor_WebGL1_GetGL"

export type state = {
    mostService: mostService,
    uiService: uiService
}

export type states = {
    [dataWorkPluginName]: dataState,
    [workPluginName]: state,
}
