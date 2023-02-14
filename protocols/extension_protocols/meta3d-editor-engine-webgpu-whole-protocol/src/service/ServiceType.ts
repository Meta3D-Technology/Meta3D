import { state as meta3dState } from "meta3d-type"
import { context } from "meta3d-webgpu-protocol/src/service/ServiceType"

export type service = {
	prepare: (meta3dState: meta3dState, isDebug: boolean, context: context) => meta3dState,
	init: (meta3dState: meta3dState) => Promise<meta3dState>,
	update: (meta3dState: meta3dState) => Promise<meta3dState>,
	render: (meta3dState: meta3dState) => Promise<meta3dState>,
}