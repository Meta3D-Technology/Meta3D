import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
// import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
// import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { api, state as meta3dState } from "meta3d-type"

let _engineSceneProtocolName: string
let _globalKeyNameForMeta3dState: string
let _globalKeyNameForAPI: string
let _globalKeyNameForMeshInstanceMap: string
let _globalKeyNameForBasicMaterialInstanceMap: string
let _globalKeyNameForGeometryInstanceMap: string

export let setVariables = (engineSceneProtocolName, globalKeyNameForMeta3dState, globalKeyNameForAPI, globalKeyNameForMeshInstanceMap, globalKeyNameForBasicMaterialInstanceMap, globalKeyNameForGeometryInstanceMap) => {
    _engineSceneProtocolName = engineSceneProtocolName
    _globalKeyNameForMeta3dState = globalKeyNameForMeta3dState
    _globalKeyNameForAPI = globalKeyNameForAPI
    _globalKeyNameForMeshInstanceMap = globalKeyNameForMeshInstanceMap
    _globalKeyNameForBasicMaterialInstanceMap = globalKeyNameForBasicMaterialInstanceMap
    _globalKeyNameForGeometryInstanceMap = globalKeyNameForGeometryInstanceMap
}

export let getMeta3dState = (): meta3dState => {
    return (globalThis as any)[_globalKeyNameForMeta3dState]
}

export let setMeta3dState = (meta3dState: meta3dState): void => {
    (globalThis as any)[_globalKeyNameForMeta3dState] = meta3dState
}

let _getAPI = (): api => {
    return (globalThis as any)[_globalKeyNameForAPI]
}

export let setAPI = (api: api): void => {
    (globalThis as any)[_globalKeyNameForAPI] = api
}

export let createEmptyMeshInstanceMap = (): void => {
    (globalThis as any)[_globalKeyNameForMeshInstanceMap] = []
}

export let createEmptyBasicMaterialInstanceMap = (): void => {
    (globalThis as any)[_globalKeyNameForBasicMaterialInstanceMap] = []
}

export let createEmptyGeometryInstanceMap = (): void => {
    (globalThis as any)[_globalKeyNameForGeometryInstanceMap] = []
}

// export let getEngineCoreService = (meta3dState: meta3dState): engineCoreService => {
//     return _getAPI().getExtensionService<engineCoreService>(meta3dState, "meta3d-engine-core-protocol")
// }

// export let getEngineCoreState = (meta3dState: meta3dState): engineCoreState => {
//     return _getAPI().getExtensionState<engineCoreState>(meta3dState, "meta3d-engine-core-protocol")
// }

export let getEngineSceneService = (meta3dState: meta3dState): engineSceneService => {
    return _getAPI().getExtensionService<engineSceneService>(meta3dState, _engineSceneProtocolName)
}
