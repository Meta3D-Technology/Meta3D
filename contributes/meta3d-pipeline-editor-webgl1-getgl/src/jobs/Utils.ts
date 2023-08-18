import { state, states, pipelineName } from "meta3d-pipeline-editor-webgl1-getgl-protocol/src/StateType"
import { state as dataState, states as dataStates, pipelineName as dataPipelineName } from "meta3d-pipeline-webgl1-data-protocol/src/StateType"

export let getState = (states: states): state  => {
    return states[pipelineName]
}

export let getDataState = (states: states): dataState  => {
    return states[dataPipelineName]
}

export let setStateToData = (states: states, state: dataState): states  => {
    return Object.assign({}, states as any as dataStates, {
        [dataPipelineName]: state
    }) as any as states;
}