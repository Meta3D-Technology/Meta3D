import { state as meta3dState } from "meta3d-type"

export type service = {
	init: (meta3dState: meta3dState, isDebug: boolean, canvas: HTMLCanvasElement) => meta3dState
};
