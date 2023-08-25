import { state as meta3dState } from "meta3d-type"
import { ecsConfig } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { service as serviceUtils } from "meta3d-engine-whole-utils/src/protocol/service/ServiceType";
import { Merge } from "meta3d-commonlib-ts/src/type"
import { webgl1Context } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable";

export type service = Merge<serviceUtils, {
	prepare: (meta3dState: meta3dState, isDebug: boolean, ecsConfig: ecsConfig, gl: nullable<webgl1Context>, canvas: HTMLCanvasElement) => meta3dState,
	loadScene: (meta3dState: meta3dState, sceneGLB: ArrayBuffer) => Promise<meta3dState>,
}>