import { state, states, pipelineName } from "meta3d-pipeline-dispose-protocol/src/StateType"

export function getState(states: states): state {
    return states[pipelineName]
}