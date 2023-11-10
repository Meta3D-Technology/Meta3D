import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { basicCameraView } from "meta3d-component-basiccameraview-protocol"
import { gameObject } from "meta3d-gameobject-protocol/src/Index"

export type viewRect = {
    x: number,
    y: number,
    width: number,
    height: number
}

export type state = {
    viewRect: nullable<viewRect>,
    arcballCameraControllerGameObject: nullable<gameObject>
    defaultActiveCameraView: nullable<basicCameraView>
}