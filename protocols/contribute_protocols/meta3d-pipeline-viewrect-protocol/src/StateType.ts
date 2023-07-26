import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const pipelineName = "ViewRect"

type viewRect = {
    x: number,
    y: number,
    width: number,
    height: number
}

export type state = {
    mostService: mostService,
    canvas: HTMLCanvasElement,
    viewRect: nullable<viewRect>
}

export type states = {
    [pipelineName]: state,
}