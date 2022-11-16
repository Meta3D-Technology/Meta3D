import { state as meta3dState } from "meta3d-type"

type initData = { isDebug: boolean, canvas: HTMLCanvasElement }

type updateData = { clearColor: [number, number, number, number] }

export type service = {
	init: (meta3dState: meta3dState, initData: initData) => Promise<meta3dState>,
	update: (meta3dState: meta3dState, updateData: updateData) => Promise<meta3dState>,
};
