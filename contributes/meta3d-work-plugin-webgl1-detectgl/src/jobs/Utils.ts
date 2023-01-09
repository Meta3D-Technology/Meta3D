import { state, states, workPluginName } from "meta3d-work-plugin-webgl1-detectgl-protocol/src/StateType"
import { workPluginName as createGLWorkPluginName } from "meta3d-work-plugin-webgl1-creategl-protocol/src/StateType"
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