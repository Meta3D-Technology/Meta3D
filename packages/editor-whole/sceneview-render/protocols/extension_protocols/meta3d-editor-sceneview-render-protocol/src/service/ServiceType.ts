import { nullable } from "meta3d-commonlib-ts/src/nullable";
import { state as meta3dState } from "meta3d-type"
import { viewRect } from "../state/StateType";

export type service = {
	getViewRect: (meta3dState: meta3dState) => nullable<viewRect>,
	prepare: (meta3dState: meta3dState, isDebug: boolean, canvas: HTMLCanvasElement) => meta3dState,
	init: (meta3dState: meta3dState) => Promise<meta3dState>,
	render: (meta3dState: meta3dState) => Promise<meta3dState>,
};
