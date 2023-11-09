import { state as meta3dState, packageProtocolName, canvasData } from "meta3d-type"
// import { ecsConfig, scene } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { webgl1Context } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable";

type addToFuncs = (meta3dState: meta3dState, func: (meta3dState: meta3dState) => Promise<meta3dState>) => Promise<meta3dState>

type ui = {
	registerElement: any
}

type event = any

type ecsConfig = any

export type configData = [canvasData, { isDebug: boolean, clearColor: [number, number, number, number], skinName: nullable<string> }]


export type initTarget = "visual" | "visualRun"

type initData = {
	target: initTarget,
	isDebug: boolean,
	canvas: HTMLCanvasElement
}

export type updateData = { clearColor: [number, number, number, number], time: number, skinName: nullable<string> }

export type service = {
	// scene: scene,
	scene: any,
	ui: ui,
	event: event,
	// initForVisual: (meta3dState: meta3dState, initData: initData) => Promise<meta3dState>,
	// initForVisualRun: (meta3dState: meta3dState, initData: initData) => Promise<meta3dState>,
	init: (meta3dState: meta3dState, initData: initData) => Promise<meta3dState>,
	update: (meta3dState: meta3dState, updateData: updateData) => Promise<meta3dState>,
	render: (meta3dState: meta3dState) => Promise<meta3dState>,
	prepare: (meta3dState: meta3dState, isDebug: boolean, ecsConfig: ecsConfig, gl: nullable<webgl1Context>, canvas: HTMLCanvasElement) => meta3dState,
	loadScene: (meta3dState: meta3dState, sceneGLB: ArrayBuffer) => Promise<meta3dState>,
	addToInitFuncs: addToFuncs,
	addToUpdateFuncs: addToFuncs,
	addToRenderFuncs: addToFuncs,
	getPluggablePackageService: <service> (meta3dState: meta3dState, packageProtocolName: packageProtocolName) => nullable<service>,
	run: (meta3dState: meta3dState, [canvasData, configData]: configData) => void,
}