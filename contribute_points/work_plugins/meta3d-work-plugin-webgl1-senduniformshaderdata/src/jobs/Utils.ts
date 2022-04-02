import { state, states, workPluginName, workPluginWhichHasUniformShaderDataState } from "meta3d-work-plugin-webgl1-senduniformshaderdata-protocol"
import { workPluginName as createGLWorkPluginName } from "meta3d-work-plugin-webgl1-creategl-protocol"
import { workPluginName as materialWorkPluginName, state as materialState } from "meta3d-work-plugin-webgl1-material-protocol"
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
    return getExn(states[createGLWorkPluginName].gl)
}

export function getProgramMap(states: states) {
    return (states[materialWorkPluginName] as any as materialState).material.programMap
}

export function getViewMatrix(states: states, workPluginName: string) {
    return getExn((states[workPluginName] as any as workPluginWhichHasUniformShaderDataState).viewMatrix)
}

export function getPMatrix(states: states, workPluginName: string) {
    return getExn((states[workPluginName] as any as workPluginWhichHasUniformShaderDataState).pMatrix)
}