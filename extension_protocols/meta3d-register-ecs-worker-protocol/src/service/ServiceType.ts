import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { state as meta3dState } from "meta3d-type/src/Index"

export type config = {
	isDebug: boolean,
	transformCount: number,
	geometryCount: number,
	geometryPointCount: number,
	pbrMaterialCount: number,
	transformBuffer: SharedArrayBuffer,
	geometryBuffer: SharedArrayBuffer,
	pbrMateiralBuffer: SharedArrayBuffer,
}

export type service = {
	register: (engineCoreState: engineCoreState, meta3dState: meta3dState, config: config) => engineCoreState
}