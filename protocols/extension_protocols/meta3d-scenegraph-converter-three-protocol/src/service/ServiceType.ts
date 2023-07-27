import { state as meta3dState } from "meta3d-type"
import type { WebGLRenderer, WebGLRendererParameters } from "three";
import { state } from "../state/StateType"

export type service = {
	init: () => void,
	convert: (meta3dState: meta3dState) => state,
	/*! perf: only meta3d-scenegraph-converter-three import three.js, others(e.g. meta3d-pipeline-webgl1-three) shouln't import three.js again
	* 
	*/
	threeAPI:  {
		createWebGLRenderer: (parameters?: WebGLRendererParameters) => WebGLRenderer
	}
};
