import { nullable } from "meta3d-commonlib-ts/src/nullable";
import { state as meta3dState } from "meta3d-type"
import { viewRect } from "../state/StateType";
import type { Object3D } from "three";

export type service = {
	getViewRect: (meta3dState: meta3dState) => nullable<viewRect>,
	setViewRect: (meta3dState: meta3dState, viewRect: viewRect) => meta3dState,
	getSelectedObjects: (meta3dState: meta3dState) => Array<Object3D>,
	setSelectedObjects: (meta3dState: meta3dState, selectedObjects: Array<Object3D>) => meta3dState,
};
