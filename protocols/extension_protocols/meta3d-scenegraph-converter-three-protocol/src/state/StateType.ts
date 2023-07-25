import { PerspectiveCamera, Scene } from "three"
import { nullable } from 'meta3d-commonlib-ts/src/nullable';

export type state = {
    perspectiveCamera: nullable<PerspectiveCamera>,
    scene: nullable<Scene>
}