import { state, states, workPluginName } from "meta3d-work-plugin-webgl1-render-protocol/src/StateType"
import { workPluginName as dataWorkPluginName, state as dataState } from "meta3d-work-plugin-webgl1-data-protocol/src/StateType"
import { workPluginName as materialWorkPluginName, state as materialState } from "meta3d-work-plugin-webgl1-material-protocol/src/StateType"
import { workPluginName as geometryWorkPluginName, state as geometryState } from "meta3d-work-plugin-webgl1-geometry-protocol/src/StateType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";

export function getState(states: states): state {
    return states[workPluginName]
}

// export function setState(states: states, state: state): states {
//     return Object.assign({}, states, {
//         [workPluginName]: state
//     });
// }

export function getGL(states: states) {
    return getExn(states[dataWorkPluginName].gl)
}

export function getVBO(states: states) {
    return (states[geometryWorkPluginName] as any as geometryState).vbo
}

export function getProgramMap(states: states) {
    return (states[materialWorkPluginName] as any as materialState).material.programMap
}

export function getAllRenderComponents(states: states) {
    return (states[dataWorkPluginName] as any as dataState).allRenderComponents
}