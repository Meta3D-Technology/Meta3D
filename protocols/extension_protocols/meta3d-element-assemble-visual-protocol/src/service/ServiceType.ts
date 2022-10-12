import { state as meta3dState } from "meta3d-type"

type data = { isDebug: boolean, canvas: HTMLCanvasElement }

export type service = {
	init: (meta3dState: meta3dState, data: data) => meta3dState,
	update: (meta3dState: meta3dState) => Promise<meta3dState>,
};
