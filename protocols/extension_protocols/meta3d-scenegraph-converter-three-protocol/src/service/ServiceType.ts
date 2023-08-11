import { state as meta3dState } from "meta3d-type"
// import type { WebGLRenderer, WebGLRendererParameters } from "three";
import { state } from "../state/StateType"

export type service = {
	init: (meta3dState: meta3dState) => meta3dState,
	convert: (meta3dState: meta3dState) => state,
	// threeAPI:  {
	// 	createWebGLRenderer: (parameters?: WebGLRendererParameters) => WebGLRenderer
	// }
};
