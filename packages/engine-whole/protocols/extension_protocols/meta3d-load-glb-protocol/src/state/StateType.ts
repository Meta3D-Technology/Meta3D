import { nullable } from "meta3d-commonlib-ts/src/nullable"
import type { WebGLRenderer } from "three"

export type state = {
    renderer: nullable<WebGLRenderer>
}