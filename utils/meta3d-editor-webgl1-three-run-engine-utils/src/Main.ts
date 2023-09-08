import { state as meta3dState, getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, api } from "meta3d-type"
// import { state } from "meta3d-editor-run-engine-protocol/src/state/StateType"
// import { service } from "meta3d-editor-run-engine-protocol/src/service/ServiceType"
import { loopFuncData, state as runEngineState } from "meta3d-editor-run-engine-protocol/src/state/StateType"
import { service as engineWholeService } from "meta3d-engine-whole-protocol/src/service/ServiceType"

// export let getExtensionServiceUtils = (api: api, engineWholeProtocolName: string
// ): service => {
// 	return {
// 		prepareAndInitEngine: (meta3dState, gl, canvas, isDebug) => {
// 			let engineWholeService = api.getExtensionService<engineWholeService>(
// 				meta3dState,
// 				engineWholeProtocolName
// 			)

// 			meta3dState = engineWholeService.prepare(meta3dState, isDebug,
// 				{
// 					float9Array1: new Float32Array(),
// 					float32Array1: new Float32Array(),
// 					transformCount: 1000,
// 					geometryCount: 1000,
// 					geometryPointCount: 10000,
// 					pbrMaterialCount: 1000
// 				},
// 				gl,
// 				canvas
// 			)


// 			return engineWholeService.init(meta3dState)
// 		},
// 		loopEngine: (meta3dState) => {
// 			let engineWholeService = api.getExtensionService<engineWholeService>(
// 				meta3dState,
// 				engineWholeProtocolName
// 			)

// 			return engineWholeService.update(meta3dState).then(meta3dState => engineWholeService.render(meta3dState))
// 		}
// 	}
// }


export let prepareAndInitEngine = (meta3dState: meta3dState,
	api: api, gl: WebGLRenderingContext, canvas: HTMLCanvasElement, isDebug: boolean,
	engineWholeProtocolName: string
) => {
	let engineWholeService = api.getExtensionService<engineWholeService>(
		meta3dState,
		engineWholeProtocolName
	)

	meta3dState = engineWholeService.prepare(meta3dState, isDebug,
		{
			float9Array1: new Float32Array(),
			float32Array1: new Float32Array(),
			transformCount: 1000,
			geometryCount: 1000,
			geometryPointCount: 10000,
			pbrMaterialCount: 1000
		},
		gl,
		canvas
	)


	return engineWholeService.init(meta3dState)
}

export let loopEngine = (meta3dState: meta3dState, api: api, engineWholeProtocolName: string) => {
	let engineWholeService = api.getExtensionService<engineWholeService>(
		meta3dState,
		engineWholeProtocolName
	)

	return engineWholeService.update(meta3dState).then(meta3dState => engineWholeService.render(meta3dState))
}


export let addToLoopFuncs = (meta3dState: meta3dState, api: api, loopFuncData: loopFuncData) => {
	let runEngineState = api.getExtensionState<runEngineState>(meta3dState, "meta3d-editor-run-engine-protocol")

	runEngineState.loopFuncs.push(loopFuncData)

	return api.setExtensionState(meta3dState, "meta3d-editor-run-engine-protocol", runEngineState)
}

export let removeFromLoopFuncs = (meta3dState: meta3dState, filterFunc: (data: loopFuncData) => boolean, api: api) => {
	let runEngineState = api.getExtensionState<runEngineState>(meta3dState, "meta3d-editor-run-engine-protocol")

	runEngineState = {
		...runEngineState,
		loopFuncs: runEngineState.loopFuncs.filter(filterFunc)
	}

	return api.setExtensionState(meta3dState, "meta3d-editor-run-engine-protocol", runEngineState)
}