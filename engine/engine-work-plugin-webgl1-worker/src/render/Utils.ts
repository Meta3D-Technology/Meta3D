import { state, states, workPluginName } from "engine-work-plugin-webgl1-worker-render-protocol"

export function getState(states: states): state {
    return states[workPluginName]
}