import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { nullable } from "../../../defaults/meta3d-commonlib-ts/src/nullable"

export const workPluginName = "engine-work-plugin-webgl1-worker-main"


export type config = {
    isDebug: boolean,
    mostService: mostService,
    engineCoreService: engineCoreService,
    canvas: HTMLCanvasElement,
    maxRenderGameObjectCount: number
}

export type state = {
    worker: nullable<Worker>,
    isDebug: boolean,
    mostService: mostService,
    engineCoreService: engineCoreService,
    canvas: HTMLCanvasElement,
    typeArray: nullable<Uint32Array>,
    renderGameObjectsCount: nullable<number>
    maxRenderGameObjectCount: number
}

export type states = { "engine-work-plugin-webgl1-worker-main": state };
