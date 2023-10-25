import { actionName, state, elementState } from "meta3d-action-dispose-gameobject-protocol"
import { actionName as selectSceneTreeNodeActionName, state as selectSceneTreeNodeState, elementState as selectSceneTreeNodeElementState } from "meta3d-action-select-scenetree-node-protocol"

export let getState = (elementState: elementState): state => {
    return elementState[actionName]
}

export let setState = (elementState: elementState, state: state): elementState => {
    return Object.assign({}, elementState, {
        [actionName]: state
    })
}

export let getSelectSceneTreeNodeState = (elementState: selectSceneTreeNodeElementState): selectSceneTreeNodeState => {
    return elementState[selectSceneTreeNodeActionName]
}

export let setSelectSceneTreeNodeState = (elementState: selectSceneTreeNodeElementState, state: selectSceneTreeNodeState): selectSceneTreeNodeElementState => {
    return Object.assign({}, elementState, {
        [selectSceneTreeNodeActionName]: state
    })
}