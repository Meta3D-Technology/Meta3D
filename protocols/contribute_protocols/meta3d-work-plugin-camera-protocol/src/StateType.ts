import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"

export const workPluginName = "Camera"

export type state = {
    mostService: mostService,
    engineCoreService: engineCoreService,
    canvasSize: [number, number],
    isDebug: boolean
}

export type states = {
    [workPluginName]: state
}
