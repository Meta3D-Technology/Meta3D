import { state, states, pipelineName } from "meta3d-pipeline-editor-webgl1-view1-three-sceneview-protocol/src/StateType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";
import { pipelineName as threePipelineName, state as threeState } from "meta3d-pipeline-webgl1-three-sceneview-protocol/src/StateType"

export let getState = (states: states): state  => {
    return states[pipelineName]
}

export let setState = (states: states, state: state): states  => {
    return Object.assign({}, states, {
        [pipelineName]: state
    });
}

export let getRenderer = (states: states) =>  {
    return getExn(states[threePipelineName].renderer)
}
