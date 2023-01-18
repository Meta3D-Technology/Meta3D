import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { program, service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { service as immutableService } from "meta3d-immutable-protocol/src/service/ServiceType"
import { workPluginName as dataWorkPluginName, state as dataState } from "meta3d-work-plugin-webgl1-data-protocol/src/StateType"
import { map } from "meta3d-immutable-protocol/src/service/MapType"

export const workPluginName = "WebGL1_Material"

export type programMap = map<number, program>;

export type state = {
    mostService: mostService,
    webgl1Service: webgl1Service,
    engineCoreService: engineCoreService,
    immutableService: immutableService,
    material: {
        programMap: programMap
    },
    workPluginWhichHasAllMaterialIndicesName: string,
}

export type workPluginWhichHasAllMaterialIndicesState = {
    allMaterialIndices: number[]
}

export type states = {
    [workPluginWhichHasAllMaterialIndicesName: string]: workPluginWhichHasAllMaterialIndicesState | dataState | state,
    [dataWorkPluginName]: dataState,
    [workPluginName]: state
}
