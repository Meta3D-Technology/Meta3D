import { state, states, pipelineName } from "meta3d-pipeline-editor-webgl1-scene-view1-protocol/src/StateType"
import { textureID } from "meta3d-ui-control-scene-view-protocol"

export function getState(states: states): state {
    return states[pipelineName]
}

export function setState(states: states, state: state): states {
    return Object.assign({}, states, {
        [pipelineName]: state
    });
}

export function getTextureID() {
    return textureID
}