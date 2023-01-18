import { state, states, workPluginName, workPluginWhichHasUniformShaderDataState } from "meta3d-work-plugin-webgl1-senduniformshaderdata-protocol/src/StateType"
import { workPluginName as dataWorkPluginName } from "meta3d-work-plugin-webgl1-data-protocol/src/StateType"
import { workPluginName as materialWorkPluginName, state as materialState } from "meta3d-work-plugin-webgl1-material-protocol/src/StateType"
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

export function getProgramMap(states: states) {
    return (states[materialWorkPluginName] as any as materialState).material.programMap
}

export function getViewMatrix(states: states, workPluginName: string) {
    return getExn((states[workPluginName] as any as workPluginWhichHasUniformShaderDataState).viewMatrix)
}

export function getPMatrix(states: states, workPluginName: string) {
    return getExn((states[workPluginName] as any as workPluginWhichHasUniformShaderDataState).pMatrix)
}