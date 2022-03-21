import { state, states, workPluginName } from "engine-work-plugin-webgl-protocol"

export function getState(states: states): state {
    return states[workPluginName]
}