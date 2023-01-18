import { state, states, workPluginName } from "meta3d-work-plugin-webgl1-material-protocol/src/StateType"
import { workPluginName as dataWorkPluginName, state as dataState } from "meta3d-work-plugin-webgl1-data-protocol/src/StateType"
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
    return getExn(states[dataWorkPluginName].gl)
}

export function getAllMaterialIndices(states: states) {
    return (states[dataWorkPluginName] as any as dataState).allMaterialIndices
}