import * as StateType from "meta3d-pipeline-editor-webgl1-view1-three-protocol/src/StateType"
import { pipelineName as threePipelineName, state as threeState } from "meta3d-pipeline-webgl1-three-gameview-protocol/src/StateType"

export const pipelineName = "Editor_WebGL1_View1_THREE_GameView"

export let pipeline = StateType.pipeline

export let job = StateType.job

export const allPipelineData = StateType.allPipelineData

export type state = StateType.state

export type states = {
    [pipelineName]: state,
    [threePipelineName]: threeState
}