import { state, states, pipelineName } from "meta3d-pipeline-dispose-gameview-protocol/src/StateType"

export let getState = (states: states): state  => {
    return states[pipelineName]
}