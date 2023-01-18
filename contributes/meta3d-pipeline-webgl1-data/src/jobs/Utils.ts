import { state, states, pipelineName } from "meta3d-pipeline-webgl1-data-protocol/src/StateType"
import { pipelineName as createGLPipelineName } from "meta3d-pipeline-webgl1-creategl-protocol/src/StateType"
import { pipelineName as geometryPipelineName } from "meta3d-pipeline-webgl1-geometry-protocol/src/StateType"
import { pipelineName as materialPipelineName } from "meta3d-pipeline-webgl1-material-protocol/src/StateType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"

export function getState(states: states): state {
    return states[pipelineName]
}

export function setState(states: states, state: state): states {
    return Object.assign({}, states, {
        [pipelineName]: state
    });
}

export function getVBO(states: states) {
    return getExn(states[geometryPipelineName].vbo)
}

export function getMaterial(states: states) {
    return getExn(states[materialPipelineName].material)
}