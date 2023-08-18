import { state, states, pipelineName } from "meta3d-pipeline-webgl1-data-protocol/src/StateType"
import { pipelineName as createGLPipelineName } from "meta3d-pipeline-webgl1-creategl-protocol/src/StateType"
import { pipelineName as geometryPipelineName } from "meta3d-pipeline-webgl1-geometry-protocol/src/StateType"
import { pipelineName as materialPipelineName } from "meta3d-pipeline-webgl1-material-protocol/src/StateType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"

export let getState = (states: states): state  => {
    return states[pipelineName]
}

export let setState = (states: states, state: state): states  => {
    return Object.assign({}, states, {
        [pipelineName]: state
    });
}

export let getVBO = (states: states) =>  {
    return getExn(states[geometryPipelineName].vbo)
}

export let getMaterial = (states: states) =>  {
    return getExn(states[materialPipelineName].material)
}