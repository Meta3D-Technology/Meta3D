import { state, states, workPluginName } from "meta3d-work-plugin-webgl1-data-protocol/src/StateType"
import { workPluginName as createGLWorkPluginName } from "meta3d-work-plugin-webgl1-creategl-protocol/src/StateType"
import { workPluginName as geometryWorkPluginName } from "meta3d-work-plugin-webgl1-geometry-protocol/src/StateType"
import { workPluginName as materialWorkPluginName } from "meta3d-work-plugin-webgl1-material-protocol/src/StateType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"

export function getState(states: states): state {
    return states[workPluginName]
}

export function setState(states: states, state: state): states {
    return Object.assign({}, states, {
        [workPluginName]: state
    });
}

export function getGL(states: states) {
    return getExn(states[createGLWorkPluginName].gl)
}

export function getVBO(states: states) {
    return getExn(states[geometryWorkPluginName].vbo)
}

export function getMaterial(states: states) {
    return getExn(states[materialWorkPluginName].material)
}