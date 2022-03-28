import { state, states, workPluginName } from "engine-work-plugin-webgl1-worker-render-protocol"
import { workPluginName as createGLWorkPluginName } from "meta3d-work-plugin-webgl1-creategl-protocol"
import { workPluginName as geometryWorkPluginName } from "meta3d-work-plugin-webgl1-geometry-protocol"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"

export function getState(states: states): state {
    return states[workPluginName]
}

export function getGL(states: states) {
    return getExn(states[createGLWorkPluginName].gl)
}

export function getVBO(states: states) {
    return getExn(states[geometryWorkPluginName].vbo)
}