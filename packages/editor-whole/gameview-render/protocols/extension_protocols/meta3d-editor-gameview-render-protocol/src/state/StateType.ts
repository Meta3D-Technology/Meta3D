import { nullable } from "meta3d-commonlib-ts/src/nullable"

export type viewRect = {
    x: number,
    y: number,
    width: number,
    height: number
}

export enum pipelineStatus {
    Start,
    Stop,
    RunOnlyOnce
}

export type state = {
    viewRect: nullable<viewRect>,
    pipelineStatus: pipelineStatus
}