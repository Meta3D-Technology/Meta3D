// declare function onCustonGlobal(meta3dState, eventName, priority, handleFunc): meta3dState

import { meta3dState } from "./type"

// declare function on(meta3dState, eventName, priority, handleFunc): meta3dState
// declare function on(meta3dState, eventName, handleFunc): meta3dState

export let service = {
    on: (meta3dState, eventName, handleFunc) => {
        meta3dState.eventManager.eventData[eventName] = handleFunc

        return meta3dState
    },
    trigger: (meta3dState, eventName, inputData): Promise<meta3dState> => {
        return meta3dState.eventManager.eventData[eventName](meta3dState, ...inputData)
    }
}

type state = {
    eventData: any
}