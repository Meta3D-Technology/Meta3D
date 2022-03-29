import { state, states, workPluginName, workPluginWhichHasMaxRenderGameObjectCountState } from "meta3d-work-plugin-renderdatabuffer-protocol"

export function getState(states: states): state {
    return states[workPluginName]
}

export function setState(states: states, state: state): states {
    return Object.assign({}, states, {
        [workPluginName]: state
    });
}

export function getMaxRenderGameObjectCount(states: states, workPluginName: string) {
    return (states[workPluginName] as any as workPluginWhichHasMaxRenderGameObjectCountState).maxRenderGameObjectCount
}