import { state as meta3dState, packageProtocolName } from "meta3d-type"
import { ecsConfig, scene } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { webgl1Context } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable";

type addToFuncs = (meta3dState: meta3dState, func: (meta3dState: meta3dState) => Promise<meta3dState>) => Promise<meta3dState>

type ui = any

type event = any

export type service = {
	scene: scene,
	ui: ui,
	event:event,
	init: (meta3dState: meta3dState) => Promise<meta3dState>,
	update: (meta3dState: meta3dState) => Promise<meta3dState>,
	render: (meta3dState: meta3dState) => Promise<meta3dState>,
	prepare: (meta3dState: meta3dState, isDebug: boolean, ecsConfig: ecsConfig, gl: nullable<webgl1Context>, canvas: HTMLCanvasElement) => meta3dState,
	loadScene: (meta3dState: meta3dState, sceneGLB: ArrayBuffer) => Promise<meta3dState>,
	addToInitFuncs: addToFuncs,
	addToUpdateFuncs: addToFuncs,
	addToRenderFuncs: addToFuncs,
	// TODO check packageProtocolName shouldn't be ui, engine-scene, core, ...
	getPluggablePackageService: <service> (meta3dState: meta3dState, packageProtocolName: packageProtocolName) => nullable<service>,
}