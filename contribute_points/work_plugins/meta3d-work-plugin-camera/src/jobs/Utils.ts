import { state, states, workPluginName, workPluginWhichHasCanvasState } from "meta3d-work-plugin-camera-protocol"

export function getState(states: states): state {
    return states[workPluginName]
}

// export function setState(states: states, state: state): states {
//     return Object.assign({}, states, {
//         [workPluginName]: state
//     });
// }

export function getCanvas(states: states, workPluginWhichHasCanvasName: string): HTMLCanvasElement {
    return (states[workPluginWhichHasCanvasName] as any as workPluginWhichHasCanvasState).canvas
}