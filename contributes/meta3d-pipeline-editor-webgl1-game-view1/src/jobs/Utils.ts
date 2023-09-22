import { state, states, pipelineName } from "meta3d-pipeline-editor-webgl1-game-view1-protocol/src/StateType"
import { textureID } from "meta3d-ui-control-game-view-protocol"

export let getState = (states: states): state  => {
    return states[pipelineName]
}

export let setState = (states: states, state: state): states  => {
    return Object.assign({}, states, {
        [pipelineName]: state
    });
}

export function getTextureID() {
    return textureID
}