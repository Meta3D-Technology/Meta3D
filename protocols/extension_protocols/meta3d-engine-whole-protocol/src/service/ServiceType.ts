import { state as meta3dState } from "meta3d-type"
import { canvasSize, ecsConfig } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { createGameObject } from "./GameObject";

export type service = {
	init: (meta3dState: meta3dState, isDebug: boolean, canvasSize: canvasSize, ecsConfig: ecsConfig, canvas: HTMLCanvasElement) => Promise<meta3dState>,
	update: (meta3dState: meta3dState) => Promise<meta3dState>,
	render: (meta3dState: meta3dState) => Promise<meta3dState>,
	scene: {
		gameObject: {
			createGameObject: createGameObject
		}
	}
};
