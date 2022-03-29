import { state, states, workPluginName, workPluginWhichHasAllRenderComponentsState } from "meta3d-work-plugin-webgl1-render-protocol"
import { workPluginName as createGLWorkPluginName } from "meta3d-work-plugin-webgl1-creategl-protocol"
import { workPluginName as materialWorkPluginName, state as materialState } from "meta3d-work-plugin-webgl1-material-protocol"
import { workPluginName as geometryWorkPluginName, state as geometryState } from "meta3d-work-plugin-webgl1-geometry-protocol"
import { getExn } from "../../../../defaults/meta3d-commonlib-ts/src/NullableUtils";

export function getState(states: states): state {
    return states[workPluginName]
}

// export function setState(states: states, state: state): states {
//     return Object.assign({}, states, {
//         [workPluginName]: state
//     });
// }

export function getGL(states: states) {
    return getExn(states[createGLWorkPluginName].gl)
}

export function getVBO(states: states) {
    return (states[geometryWorkPluginName] as any as geometryState).vbo
}

export function getProgramMap(states: states) {
    return (states[materialWorkPluginName] as any as materialState).material.programMap
}

export function getAllRenderComponents(states: states, workPluginName: string) {
    return (states[workPluginName] as any as workPluginWhichHasAllRenderComponentsState).allRenderComponents
}