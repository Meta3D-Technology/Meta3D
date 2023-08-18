import { state, states, pipelineName } from "meta3d-pipeline-webgl1-senduniformshaderdata-protocol/src/StateType"
import { pipelineName as dataPipelineName, state as dataState } from "meta3d-pipeline-webgl1-data-protocol/src/StateType"
import { pipelineName as materialPipelineName, state as materialState } from "meta3d-pipeline-webgl1-material-protocol/src/StateType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";

export let getState = (states: states): state  => {
    return states[pipelineName]
}

// export let setState = (states: states, state: state): states  => {
//     return Object.assign({}, states, {
//         [pipelineName]: state
//     });
// }

export let getGL = (states: states) =>  {
    return getExn(states[dataPipelineName].gl)
}

export let getProgramMap = (states: states) =>  {
    return (states[materialPipelineName] as any as materialState).material.programMap
}

export let getViewMatrix = (states: states) =>  {
    return getExn((states[dataPipelineName] as any as dataState).viewMatrix)
}

export let getPMatrix = (states: states) =>  {
    return getExn((states[dataPipelineName] as any as dataState).pMatrix)
}