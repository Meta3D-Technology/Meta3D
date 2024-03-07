import { state as meta3dState, packageProtocolName, canvasData } from "meta3d-type"
import { ecsConfig, service as engineSceneService_ } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable";
import { service as uiService_, texture } from "meta3d-ui-protocol/src/service/ServiceType"
import { service as eventService_ } from "meta3d-event-protocol/src/service/ServiceType"
import { service as coreService_ } from "meta3d-core-protocol/src/service/ServiceType"
import { cleanScene, importScene } from "meta3d-import-scene-protocol/src/service/ServiceType"
import { exportScene } from "meta3d-export-scene-protocol/src/service/ServiceType"
import { service as assetService_ } from "meta3d-asset-protocol/src/service/ServiceType"
import { service as libService_ } from "meta3d-lib-protocol/src/service/ServiceType"
import { service as interactService_ } from "meta3d-interact-protocol/src/service/ServiceType"
import { initData, initFunc, updateData, env } from "../state/StateType";
import { uiControlContribute as uiControlContribute_ } from "meta3d-ui-protocol/src/contribute/UIControlContributeType"
import { inputContribute as inputContribute_ } from "meta3d-ui-protocol/src/contribute/InputContributeType"
import { actionContribute as actionContribute_ } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { addGroup } from "meta3d-scenegraph-converter-three-protocol/src/service/ServiceType"

export type uiTexture = texture

export type configData = [canvasData, {
	isDebug: boolean, clearColor: [number, number, number, number], skinName: nullable<string>
	env: env
}]


type addToInitFuncs = (meta3dState: meta3dState, func: initFunc) => meta3dState

// type addToFuncs = (meta3dState: meta3dState, func: func) => meta3dState

export type uiControlContribute<inputFunc, specificData, outputData> = uiControlContribute_<inputFunc, specificData, outputData>

export type inputContribute<data> = inputContribute_<data>

export type actionContribute<uiData, state> = actionContribute_<uiData, state>

export type engineSceneService = engineSceneService_

export type uiService = uiService_

export type eventService = eventService_

export type coreService = coreService_

export type assetService = assetService_

export type libService = libService_

export type interactService = interactService_

export type service = {
	scene: (meta3dState: meta3dState) => engineSceneService,
	ui: (meta3dState: meta3dState) => uiService,
	event: (meta3dState: meta3dState) => eventService,
	core: (meta3dState: meta3dState) => coreService,
	asset: (meta3dState: meta3dState) => assetService,
	lib: (meta3dState: meta3dState) => libService,
	interact: (meta3dState: meta3dState) => interactService,

	addGroup: addGroup,
	cleanScene: cleanScene,
	importScene: importScene,
	exportScene: exportScene,
	// initForVisual: (meta3dState: meta3dState, initData: initData) => Promise<meta3dState>,
	// initForVisualRun: (meta3dState: meta3dState, initData: initData) => Promise<meta3dState>,
	init: (meta3dState: meta3dState, initData: initData) => Promise<meta3dState>,
	update: (meta3dState: meta3dState, updateData: updateData) => Promise<meta3dState>,
	// render: (meta3dState: meta3dState) => Promise<meta3dState>,
	// prepare: (meta3dState: meta3dState, isDebug: boolean, ecsConfig: ecsConfig, gl: nullable<webgl1Context>, canvas: HTMLCanvasElement) => meta3dState,
	// addToPrepareFuncs: (meta3dState: meta3dState, func: (meta3dState: meta3dState, isDebug: boolean, canvas: HTMLCanvasElement) => meta3dState) => meta3dState,
	addToInitFuncs: addToInitFuncs,
	// addToUpdateFuncs: addToFuncs,
	// addToRenderFuncs: addToFuncs,
	getPluggablePackageService: <service> (meta3dState: meta3dState, packageProtocolName: packageProtocolName) => nullable<service>,
	run: (meta3dState: meta3dState, configData: configData) => void,
}