import { state as meta3dState } from "meta3d-type"

type initData = { isDebug: boolean, canvas: HTMLCanvasElement }

export type updateData = { clearColor: [number, number, number, number], time: number, skinName: string }

export type service = {
	init: (meta3dState: meta3dState, initData: initData) => Promise<meta3dState>,
	update: (meta3dState: meta3dState, updateData: updateData) => Promise<meta3dState>,
};
