import { state, states, pipelineName } from "meta3d-pipeline-editor-viewrect-protocol/src/StateType"

export function getState(states: states): state {
    return states[pipelineName]
}

export function setState(states: states, state: state): states {
    return Object.assign({}, states, {
        [pipelineName]: state
    });
}
