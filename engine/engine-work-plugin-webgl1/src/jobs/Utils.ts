import { state, states, workPluginName } from "engine-work-plugin-webgl1-protocol"
import { workPluginName as createGLWorkPluginName } from "meta3d-work-plugin-webgl1-creategl-protocol"
import { vbo, workPluginName as geometryWorkPluginName } from "meta3d-work-plugin-webgl1-geometry-protocol"
import { workPluginName as materialWorkPluginName } from "meta3d-work-plugin-webgl1-material-protocol"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"

export function getState(states: states): state {
    return states[workPluginName]
}

export function setState(states: states, state: state): states {
    return Object.assign({}, states, {
        [workPluginName]: state
    })
}

export function getGL(states: states) {
    return getExn(states[createGLWorkPluginName].gl)
}

export function getVBO(states: states) {
    return getExn(states[geometryWorkPluginName].vbo)
}

export function setVBO(states: states, vbo: vbo) {
    return Object.assign({}, states, {
        [geometryWorkPluginName]: {
            ...states[geometryWorkPluginName],
            vbo: vbo
        }
    })
}

export function getMaterial(states: states) {
    return getExn(states[materialWorkPluginName].material)
}