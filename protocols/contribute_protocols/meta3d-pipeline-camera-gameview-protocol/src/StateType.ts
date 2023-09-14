import * as StateType from "meta3d-pipeline-camera-sceneview-protocol/src/StateType"
import { pipelineName as viewRectPipelineName, state as viewRectState } from "meta3d-pipeline-viewRect-gameview-protocol/src/StateType"

export const pipelineName = "Camera_GameView"

export let pipeline = StateType.pipeline

export let job = StateType.job

export const allPipelineData = StateType.allPipelineData

export type state = StateType.state

export type states = {
    [pipelineName]: state,
    [viewRectPipelineName]: viewRectState,
}
