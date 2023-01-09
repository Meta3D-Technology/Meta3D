import { state, states, workPluginName, workPluginWhichHasAllGeometryIndicesState } from "meta3d-work-plugin-webgl1-geometry-protocol/src/StateType"
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

export function getAllGeometryIndices(states: states, workPluginWhichHasAllGeometryIndicesName: string) {
    return (states[workPluginWhichHasAllGeometryIndicesName] as any as workPluginWhichHasAllGeometryIndicesState).allGeometryIndices
}