import { nullable } from "meta3d-commonlib-ts/src/nullable"
import type { Object3D } from "three";

export type viewRect = {
    x: number,
    y: number,
    width: number,
    height: number
}

export type state = {
    viewRect: nullable<viewRect>,
    selectedObjects: Array<Object3D>
}