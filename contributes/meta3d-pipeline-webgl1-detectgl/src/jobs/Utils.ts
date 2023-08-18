import { state, states, pipelineName } from "meta3d-pipeline-webgl1-detectgl-protocol/src/StateType"
import { pipelineName as dataPipelineName } from "meta3d-pipeline-webgl1-data-protocol/src/StateType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"

export let getState = (states: states): state  => {
    return states[pipelineName]
}

export let setState = (states: states, state: state): states  => {
    return Object.assign({}, states, {
        [pipelineName]: state
    });
}

export let getGL = (states: states) =>  {
    return getExn(states[dataPipelineName].gl)
}