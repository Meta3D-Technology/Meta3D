import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { gameObject } from "meta3d-gameobject-protocol/src/Index"

export type state = {
	canvas: nullable<HTMLCanvasElement>,
	arcballCameraControllerGameObject: nullable<gameObject>
}