import { state as meta3dState } from "meta3d-type"
import { webgl1Context } from "meta3d-webgl1-protocol/src/service/ServiceType";

export type service = {
	prepare: (meta3dState: meta3dState, isDebug: boolean, gl: webgl1Context, canvas: HTMLCanvasElement) => meta3dState
};
