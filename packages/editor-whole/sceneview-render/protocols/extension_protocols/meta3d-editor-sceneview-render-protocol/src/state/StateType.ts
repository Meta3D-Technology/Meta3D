import { nullable } from "meta3d-commonlib-ts/src/nullable"

export type viewRect = {
    x: number,
    y: number,
    width: number,
    height: number
}

export type state = {
    // canvas:nullable<HTMLCanvasElement>
    viewRect: nullable<viewRect>
}