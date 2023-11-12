import { nullable } from "meta3d-commonlib-ts/src/nullable";
import { state as meta3dState } from "meta3d-type"
import {  viewRect } from "../state/StateType";

export type service = {
	getViewRect: (meta3dState: meta3dState) => nullable<viewRect>,
	setViewRect: (meta3dState: meta3dState, viewRect: viewRect) => meta3dState,
	isPipelineStop: (meta3dState: meta3dState) => boolean,
	isPipelineRunOnlyOnce: (meta3dState: meta3dState) => boolean,
	start: (meta3dState: meta3dState) => meta3dState,
	stop: (meta3dState: meta3dState) => meta3dState,
	runOnlyOnce: (meta3dState: meta3dState) => meta3dState,
};
