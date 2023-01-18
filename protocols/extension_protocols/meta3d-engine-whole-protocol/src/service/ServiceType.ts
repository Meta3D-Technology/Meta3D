import { state as meta3dState } from "meta3d-type"
import { ecsConfig } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { service as serviceUtils } from "meta3d-engine-whole-utils/src/protocol/service/ServiceType";
import { Merge } from "meta3d-commonlib-ts/src/type"

export type service = Merge<serviceUtils, {
	prepare: (meta3dState: meta3dState, isDebug: boolean, ecsConfig: ecsConfig, canvas: HTMLCanvasElement) => meta3dState,
}>