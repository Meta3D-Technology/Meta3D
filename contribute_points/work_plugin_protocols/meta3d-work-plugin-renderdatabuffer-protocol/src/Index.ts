import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { service as renderDataBufferService } from "meta3d-renderdatabuffer-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const workPluginName = "RenderDataBuffer"

export type transformData = {
    componentName: string
}

export type geometryData = {
    componentName: string
}

export type materialData = {
    componentName: string
}

export type renderDataBufferTypeArray = Uint32Array

export type renderGameObjectsCount = number

export type state = {
    mostService: mostService,
    engineCoreService: engineCoreService,
    renderDataBufferService: renderDataBufferService,
    transformData: transformData,
    geometryData: geometryData,
    materialData: materialData,
    workPluginWhichHasMaxRenderGameObjectCountName: string,
    renderDataBufferTypeArray: nullable<renderDataBufferTypeArray>,
    renderGameObjectsCount: renderGameObjectsCount
}

export type workPluginWhichHasMaxRenderGameObjectCountState = {
    maxRenderGameObjectCount: number
}

export type states = {
    [workPluginWhichHasMaxRenderGameObjectCountName: string]: workPluginWhichHasMaxRenderGameObjectCountState | state,
    [workPluginName]: state
}

export type config = {
    mostService: mostService,
    engineCoreService: engineCoreService,
    renderDataBufferService: renderDataBufferService,
    transformData: transformData,
    geometryData: geometryData,
    materialData: materialData,
    workPluginWhichHasMaxRenderGameObjectCountName: string,
}