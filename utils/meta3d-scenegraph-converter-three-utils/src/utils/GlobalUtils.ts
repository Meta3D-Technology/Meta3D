import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { gameObject } from "meta3d-gameobject-protocol"
import { getAllGameObjectsFunc } from "meta3d-scenegraph-converter-three-protocol/src/service/ServiceType"
// import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
// import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { api, state as meta3dState } from "meta3d-type"

let _engineSceneProtocolName: string
let _globalKeyNameForMeta3dState: string
let _globalKeyNameForAPI: string
let _globalKeyNameForMeshInstanceMap: string
let _globalKeyNameForPhysicalMaterialInstanceMap: string
let _globalKeyNameForTextureInstanceMap: string
let _globalKeyNameForGeometryInstanceMap: string
let _globalKeyNameForDirectionLightInstanceMap: string

export let setVariables = (engineSceneProtocolName, globalKeyNameForMeta3dState, globalKeyNameForAPI, globalKeyNameForMeshInstanceMap, globalKeyNameForPhysicalMaterialInstanceMap,
    globalKeyNameForTextureInstanceMap,


    globalKeyNameForGeometryInstanceMap,
    globalKeyNameForDirectionLightInstanceMap
) => {
    _engineSceneProtocolName = engineSceneProtocolName
    _globalKeyNameForMeta3dState = globalKeyNameForMeta3dState
    _globalKeyNameForAPI = globalKeyNameForAPI
    _globalKeyNameForMeshInstanceMap = globalKeyNameForMeshInstanceMap
    _globalKeyNameForPhysicalMaterialInstanceMap = globalKeyNameForPhysicalMaterialInstanceMap

    _globalKeyNameForTextureInstanceMap = globalKeyNameForTextureInstanceMap

    _globalKeyNameForGeometryInstanceMap = globalKeyNameForGeometryInstanceMap

    _globalKeyNameForDirectionLightInstanceMap = globalKeyNameForDirectionLightInstanceMap
}

export let getMeta3dState = (): meta3dState => {
    return (globalThis as any)[_globalKeyNameForMeta3dState]
}

export let setMeta3dState = (meta3dState: meta3dState): void => {
    (globalThis as any)[_globalKeyNameForMeta3dState] = meta3dState
}

export let getGetAllGameObjectsFunc = (): getAllGameObjectsFunc => {
    return (globalThis as any)["meta3d_getAllGameObjects"]
}

export let setGetAllGameObjectsFunc = (func: getAllGameObjectsFunc): void => {
    (globalThis as any)["meta3d_getAllGameObjects"] = func
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

export let createEmptyPhysicalMaterialInstanceMap = (): void => {
    (globalThis as any)[_globalKeyNameForPhysicalMaterialInstanceMap] = []
}

export let createEmptyTextureInstanceMap = (): void => {
    (globalThis as any)[_globalKeyNameForTextureInstanceMap] = []
}


export let createEmptyGeometryInstanceMap = (): void => {
    (globalThis as any)[_globalKeyNameForGeometryInstanceMap] = []
}

export let createEmptyDirectionLightInstanceMap = (): void => {
    (globalThis as any)[_globalKeyNameForDirectionLightInstanceMap] = []
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
