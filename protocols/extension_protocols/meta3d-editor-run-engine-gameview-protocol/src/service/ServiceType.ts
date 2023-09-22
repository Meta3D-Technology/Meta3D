// import * as ServceType from "meta3d-editor-run-engine-sceneview-protocol/src/service/ServiceType"
// import { Merge } from "meta3d-commonlib-ts/src/type"
import { state as meta3dState } from "meta3d-type"
import { context } from "meta3d-imgui-renderer-protocol/src/service/ServiceType";

export type service = {
	prepareAndInitEngine: (
		meta3dState: meta3dState,
		gl: context,
		canvas: HTMLCanvasElement,
		isDebug: boolean
	) => Promise<meta3dState>,
	loopEngineWhenStop: (meta3dState: meta3dState) => Promise<meta3dState>,
	addToLoopFuncs: (meta3dState: meta3dState) => meta3dState,
	removeFromLoopFuncs: (meta3dState: meta3dState) => meta3dState
}
