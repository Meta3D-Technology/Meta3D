import { state, states, workPluginName } from "engine-work-plugin-webgl1-protocol"
import { workPluginName as createGLWorkPluginName } from "meta3d-work-plugin-webgl1-creategl-protocol"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"

export function getState(states: states): state {
    return states[workPluginName]
}

export function getGL(states: states) {
    return getExn(states[createGLWorkPluginName].gl)
}