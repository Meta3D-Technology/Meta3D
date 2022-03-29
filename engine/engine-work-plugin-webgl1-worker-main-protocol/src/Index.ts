import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { service as webgl1WorkerSyncService } from "meta3d-webgl1-worker-sync-protocol/src/service/ServiceType"
import { nullable } from "../../../defaults/meta3d-commonlib-ts/src/nullable"
import { workPluginName as renderDataBufferWorkPluginName, state as renderDataBufferState } from "meta3d-work-plugin-renderdatabuffer-protocol"

export const workPluginName = "engine-work-plugin-webgl1-worker-main"

export type config = {
    isDebug: boolean,
    mostService: mostService,
    engineCoreService: engineCoreService,
    webgl1WorkerSyncService: webgl1WorkerSyncService,
    canvas: HTMLCanvasElement,
    maxRenderGameObjectCount: number
}

export type state = {
    worker: nullable<Worker>,
    isDebug: boolean,
    mostService: mostService,
    engineCoreService: engineCoreService,
    webgl1WorkerSyncService: webgl1WorkerSyncService,
    canvas: HTMLCanvasElement,
    maxRenderGameObjectCount: number
}

export type states = {
    [workPluginName]: state,
    [renderDataBufferWorkPluginName]: renderDataBufferState
}
