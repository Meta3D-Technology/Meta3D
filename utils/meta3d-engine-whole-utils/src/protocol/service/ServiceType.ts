import { state as meta3dState } from "meta3d-type"
import { scene } from "meta3d-engine-scene-sceneview-protocol/src/service/ServiceType"

// import { nullable } from "meta3d-commonlib-ts/src/nullable";
// import { webgl1Context } from "meta3d-webgl1-protocol/src/service/ServiceType";

// type glData = [nullable<HTMLCanvasElement>, nullable<webgl1Context>]

export type service = {
	// prepare: (meta3dState: meta3dState, isDebug: boolean, ecsConfig: ecsConfig, glData: glData) => meta3dState,
	init: (meta3dState: meta3dState) => Promise<meta3dState>,
	update: (meta3dState: meta3dState) => Promise<meta3dState>,
	render: (meta3dState: meta3dState) => Promise<meta3dState>,
	scene: scene
}
