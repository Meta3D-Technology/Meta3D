import { actionName as runActionName, state as runState, elementState as runElementState } from "meta3d-action-run-protocol"
// import { actionName, state, elementState } from "meta3d-action-stop-protocol"

export let getRunState = (elementState: runElementState): runState => {
    return elementState[runActionName]
}

export let setRunState = (elementState: runElementState, state: runState): runElementState => {
    return Object.assign({}, elementState, {
        [runActionName]: state
    })
}