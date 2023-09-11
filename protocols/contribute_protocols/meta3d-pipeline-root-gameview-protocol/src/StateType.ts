import * as StateType from "meta3d-pipeline-root-protocol/src/StateType"

export const pipelineName = "Root_GameView"

export let pipeline = StateType.pipeline

export let job = StateType.job

export type state = StateType.state

export type states = {
    [pipelineName]: state
}
