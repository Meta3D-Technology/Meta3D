import { actionName, state, elementState } from "meta3d-action-load-glb-protocol"

export let getState = (elementState: elementState): state => {
    return elementState[actionName]
}

export let setState = (elementState: elementState, state: state): elementState => {
    return Object.assign({}, elementState, {
        [actionName]: state
    })
}