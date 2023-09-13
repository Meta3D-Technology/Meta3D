import { state as meta3dState, api } from "meta3d-type"
import { actionName as runActionName, state as runState, elementState as runElementState } from "meta3d-action-run-protocol"
import { getActionState } from "meta3d-ui-utils/src/ElementStateUtils"
// import { actionName, state, elementState } from "meta3d-action-stop-protocol"

export let getRunState = (elementState: runElementState): runState => {
    return elementState[runActionName]
}

export let setRunState = (elementState: runElementState, state: runState): runElementState => {
    return Object.assign({}, elementState, {
        [runActionName]: state
    })
}

export let getRunStateFromMeta3dState = (meta3dState: meta3dState, api: api): runState => {
    return getActionState<runState>(meta3dState, api, runActionName)
}