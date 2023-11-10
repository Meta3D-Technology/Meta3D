import { nullable } from "meta3d-commonlib-ts/src/nullable";
import { state as meta3dState } from "meta3d-type"
import { viewRect } from "../state/StateType";
import { gameObject } from "meta3d-gameobject-protocol";
import { basicCameraView } from "meta3d-component-basiccameraview-protocol"

export type service = {
	getViewRect: (meta3dState: meta3dState) => nullable<viewRect>,
	setViewRect: (meta3dState: meta3dState, viewRect: viewRect) => meta3dState,
	getArcballCameraControllerGameObject: (meta3dState: meta3dState) => nullable<gameObject>,
	setArcballCameraControllerGameObject: (meta3dState: meta3dState, gameObject: gameObject) => meta3dState,
	getDefaultActiveCameraView: (meta3dState: meta3dState) => nullable<basicCameraView>,
	setDefaultActiveCameraView: (meta3dState: meta3dState, basicCameraView: basicCameraView) => meta3dState,
	// prepare: (meta3dState: meta3dState, isDebug: boolean, canvas: HTMLCanvasElement) => meta3dState,
	// init: (meta3dState: meta3dState) => Promise<meta3dState>,
	// render: (meta3dState: meta3dState) => Promise<meta3dState>,
};
