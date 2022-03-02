import { state, states, workPluginName } from "meta3d-work-plugin-webgl-protocol"

export function getState(states: states): state {
    return states[workPluginName]
}