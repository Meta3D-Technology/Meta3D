import { state as meta3dState, packageProtocolName } from "meta3d-type"
import { ecsConfig, service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
// import { nullable } from "meta3d-commonlib-ts/src/nullable";
// import { service as eventService_ } from "meta3d-event-protocol/src/service/ServiceType"
import { initFunc } from "../state/StateType";

type addToInitFuncs = (meta3dState: meta3dState, func: initFunc) => meta3dState

// export type eventService = eventService_

export type service = {
	scene: (meta3dState: meta3dState) => engineSceneService,
	prepare: (meta3dState: meta3dState, isDebug: boolean, ecsConfig: ecsConfig) => meta3dState,
	init: (meta3dState: meta3dState, canvas: HTMLCanvasElement) => Promise<meta3dState>,
	update: (meta3dState: meta3dState) => Promise<meta3dState>,
	render: (meta3dState: meta3dState) => Promise<meta3dState>,
	loadScene: (meta3dState: meta3dState, sceneGLB: ArrayBuffer) => Promise<meta3dState>,
	addToInitFuncs: addToInitFuncs,
}