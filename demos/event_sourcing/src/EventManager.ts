// declare function onCustonGlobal(meta3dState, eventName, priority, handleFunc): meta3dState

import { meta3dState } from "./type"

// declare function on(meta3dState, eventName, priority, handleFunc): meta3dState
declare function on(meta3dState, eventName, handleFunc): meta3dState

declare function trigger(meta3dState, eventName): Promise<meta3dState>

type state = {
    eventData: any
}