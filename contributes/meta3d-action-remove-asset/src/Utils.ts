import { actionName, state, elementState } from "meta3d-action-remove-asset-protocol"
import { actionName as loadGlbActionName, state as loadGlbState, elementState as loadGlbElementState } from "meta3d-action-load-glb-protocol"
import { actionName as selectAssetActionName, state as selectAssetState, elementState as selectAssetElementState } from "meta3d-action-select-asset-protocol"

export let getState = (elementState: elementState): state => {
    return elementState[actionName]
}

export let setState = (elementState: elementState, state: state): elementState => {
    return Object.assign({}, elementState, {
        [actionName]: state
    })
}

export let getLoadGlbState = (elementState: loadGlbElementState): loadGlbState => {
    return elementState[loadGlbActionName]
}

export let setLoadGlbState = (elementState: loadGlbElementState, state: loadGlbState): loadGlbElementState => {
    return Object.assign({}, elementState, {
        [loadGlbActionName]: state
    })
}

export let getSelectAssetState = (elementState: selectAssetElementState): selectAssetState => {
    return elementState[selectAssetActionName]
}

export let setSelectAssetState = (elementState: selectAssetElementState, state: selectAssetState): selectAssetElementState => {
    return Object.assign({}, elementState, {
        [selectAssetActionName]: state
    })
}