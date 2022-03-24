import { state, states, workPluginName } from "engine-work-plugin-webgl1-worker-main-protocol"

export function getState(states: states): state {
    return states[workPluginName]
}