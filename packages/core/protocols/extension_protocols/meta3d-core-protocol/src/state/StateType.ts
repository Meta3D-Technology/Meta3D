import { pipeline, state as pipelineRootState_, states as pipelineRootStates_, job } from "meta3d-pipeline-root-protocol/src/StateType"
import { config } from "meta3d-pipeline-root-protocol/src/ConfigType"

export type state = null

export let pipelineRootPipeline = pipeline

export let pipelineRootJob = job

export type pipelineRootState = pipelineRootState_

export type pipelineRootStates = pipelineRootStates_

export type pipelineRootConfig = config