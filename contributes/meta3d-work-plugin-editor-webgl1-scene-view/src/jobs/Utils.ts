import { state, states, workPluginName } from "meta3d-work-plugin-editor-webgl1-scene-view-protocol/src/StateType"

export function getState(states: states): state {
    return states[workPluginName]
}

export function setState(states: states, state: state): states {
    return Object.assign({}, states, {
        [workPluginName]: state
    });
}

export function getTextureID() {
    return "sceneView"
}