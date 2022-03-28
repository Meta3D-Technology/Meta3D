import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"

export const workPluginName = "Camera"

export type state = {
    isDebug: boolean,
    mostService: mostService,
    engineCoreService: engineCoreService,
    workPluginWhichHasCanvasName: string
}

export type workPluginWhichHasCanvasState = {
    canvas: HTMLCanvasElement
}

export type states = {
    [workPluginWhichHasCanvasName: string]: workPluginWhichHasCanvasState | state,
    [workPluginName]: state
}

export type config = {
    isDebug: boolean,
    mostService: mostService,
    engineCoreService: engineCoreService,
    workPluginWhichHasCanvasName: string
}