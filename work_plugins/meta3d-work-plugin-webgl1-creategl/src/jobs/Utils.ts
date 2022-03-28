import { state, states, workPluginName } from "meta3d-work-plugin-webgl1-creategl-protocol"

export function getState(states: states): state {
    return states[workPluginName]
}

export function setState(states: states, state: state): states {
    return Object.assign({}, states, {
        [workPluginName]: state
    });
}