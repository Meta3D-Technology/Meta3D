import { state as meta3dState } from "meta3d-type"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { stream } from "meta3d-bs-most-protocol/src/service/StreamType.gen"
import { renderDataBufferTypeArray, renderGameObjectsCount } from "meta3d-work-plugin-renderdatabuffer-protocol";
import { viewMatrix, pMatrix } from "meta3d-work-plugin-webgl1-senduniformshaderdata-protocol"

export type initRenderData = {
	offscreenCanvas: OffscreenCanvas
	allGeometryIndices: number[]
	allMaterialIndices: number[]
	transformCount: number
	geometryCount: number
	geometryPointCount: number
	pbrMaterialCount: number
	transformBuffer: SharedArrayBuffer
	geometryBuffer: SharedArrayBuffer
	pbrMaterialBuffer: SharedArrayBuffer
}

type renderDataBufferData = {
	typeArray: renderDataBufferTypeArray,
	renderGameObjectsCount: renderGameObjectsCount
}

export type renderData = {
	camera: {
		viewMatrix: viewMatrix,
		pMatrix: pMatrix
	},
	renderDataBufferData: renderDataBufferData
}

export type service = {
	sendInitRenderData: (engineCoreService: engineCoreService, engineCoreState: engineCoreState, isDebug: boolean, worker: Worker, offscreenCanvas: OffscreenCanvas) => void,
	getInitRenderData: (mostService: mostService) => stream<initRenderData>,
	sendFinishInitRenderData: () => void,
	getFinishInitRenderData: (mostService: mostService, worker: Worker) => stream<void>,
	sendBeginLoopData: (worker: Worker) => void,
	initConcatGetBeginLoopData: (mostService: mostService, initFunc: (meta3dState: meta3dState, isDebug: boolean) => Promise<meta3dState>, loopFunc: (meta3dState: meta3dState) => Promise<meta3dState>, meta3dState: meta3dState, isDebug: boolean) => Promise<void>,
	getRenderData: (mostService: mostService) => stream<renderData>,
	sendRenderData: (engineCoreService: engineCoreService, engineCoreState: engineCoreState, isDebug: boolean, worker: Worker, renderDataBufferData: renderDataBufferData) => void,
	sendFinishRenderData: () => void,
	getFinishRenderData: (mostService: mostService, worker: Worker) => stream<void>,
}