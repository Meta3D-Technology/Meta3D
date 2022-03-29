import { state, states, workPluginName } from "engine-work-plugin-webgl1-worker-main-protocol"
import { workPluginName as renderDataBufferWorkPluginName } from "meta3d-work-plugin-renderdatabuffer-protocol"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"

export function getState(states: states): state {
    return states[workPluginName]
}

export function getRenderDataBufferTypeArray(states: states) {
    return getExn(states[renderDataBufferWorkPluginName].renderDataBufferTypeArray)
}

export function getRenderGameObjectsCount(states: states) {
    return states[renderDataBufferWorkPluginName].renderGameObjectsCount
}

