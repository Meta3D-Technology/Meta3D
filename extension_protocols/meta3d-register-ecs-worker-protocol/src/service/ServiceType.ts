import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"

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
	register: (engineCoreState: engineCoreState, engineCoreService: engineCoreService, config: config) => engineCoreState
}