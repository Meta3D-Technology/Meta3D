import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { workPluginName as dataWorkPluginName, state as dataState } from "meta3d-work-plugin-webgl1-data-protocol/src/StateType"

export const workPluginName = "Camera"

export type state = {
    mostService: mostService,
    engineCoreService: engineCoreService,
    isDebug: boolean
}

export type states = {
    [workPluginName]: state,
    [dataWorkPluginName]: dataState,
}
