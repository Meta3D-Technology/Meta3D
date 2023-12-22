import { mostService } from "meta3d-core-protocol/src/service/ServiceType"

export const pipelineName = "Root"

export enum pipeline {
    Init = "init",
    Update = "update",
    Render = "render",
}

export enum job {
    Init = "init_root_meta3d",
    Update = "update_root_meta3d",
    Render = "render_root_meta3d",
}

export type state = { mostService: mostService }

export type states = { [pipelineName]: state }
