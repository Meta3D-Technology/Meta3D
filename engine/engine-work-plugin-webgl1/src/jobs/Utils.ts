import { state, states, workPluginName } from "engine-work-plugin-webgl1-protocol"

export function getState(states: states): state {
    return states[workPluginName]
}