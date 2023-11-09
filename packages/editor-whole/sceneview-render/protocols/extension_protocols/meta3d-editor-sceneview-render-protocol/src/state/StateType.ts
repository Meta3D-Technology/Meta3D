import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { gameObject } from "meta3d-gameobject-protocol/src/Index"

export type viewRect = {
    x: number,
    y: number,
    width: number,
    height: number
}

export type state = {
    // canvas:nullable<HTMLCanvasElement>
    viewRect: nullable<viewRect>,
    arcballCameraControllerGameObject: nullable<gameObject>
}