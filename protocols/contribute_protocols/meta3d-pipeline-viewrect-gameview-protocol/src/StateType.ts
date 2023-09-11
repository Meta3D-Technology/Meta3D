import * as StateType from "meta3d-pipeline-viewrect-protocol/src/StateType"

export const pipelineName = "ViewRect_GameView"

export let pipeline = StateType.pipeline

export let job = StateType.job

export const allPipelineData = StateType.allPipelineData

export type state = StateType.state

export type states = {
	[pipelineName]: state
}