import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { state } from "meta3d-engine-whole-protocol/src/state/StateType"
import { service } from "meta3d-engine-whole-protocol/src/service/ServiceType"
// import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
// import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { service as engineBasicService } from "meta3d-engine-basic-protocol/src/service/ServiceType"
// import { state as engineBasicState } from "meta3d-engine-basic-protocol/src/state/StateType"
import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
// import { state as engineSceneState } from "meta3d-engine-scene-protocol/src/state/StateType"
import { service as engineRenderService } from "meta3d-engine-render-protocol/src/service/ServiceType"
// import { state as engineRenderState } from "meta3d-engine-render-protocol/src/state/StateType"
// import { init, render, update } from "./DirectorAPI"
import { getExtensionService as getEngineWholeExtensionService } from "meta3d-engine-whole-utils/src/implement/Main"
import { service as importSceneService } from "meta3d-import-scene-protocol/src/service/ServiceType"

export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
	return {
		...getEngineWholeExtensionService(api, [
			"meta3d-bs-most-protocol",
			"meta3d-engine-core-protocol",
			"meta3d-engine-scene-protocol",
		]),
		prepare: (meta3dState: meta3dState, isDebug, ecsConfig, gl, canvas) => {
			// let engineBasicState = api.getExtensionState<engineBasicState>(meta3dState, meta3dEngineBasicExtensionProtocolName)

			let engineBasicService = api.getExtensionService<engineBasicService>(
				meta3dState,
				"meta3d-engine-basic-protocol"
			)

			meta3dState = engineBasicService.prepare(meta3dState, isDebug)

			// let engineSceneState = api.getExtensionState<engineSceneState>(meta3dState, "meta3d-engine-scene-protocol")

			let engineSceneService = api.getExtensionService<engineSceneService>(
				meta3dState,
				"meta3d-engine-scene-protocol"
			)

			meta3dState = engineSceneService.prepare(meta3dState, isDebug, ecsConfig)


			// let engineRenderState = api.getExtensionState<engineRenderState>(meta3dState, meta3dEngineRenderExtensionProtocolName)

			let engineRenderService = api.getExtensionService<engineRenderService>(
				meta3dState,
				"meta3d-engine-render-protocol"
			)

			meta3dState = engineRenderService.prepare(meta3dState, isDebug, canvas)


			meta3dState = api.setExtensionState<state>(meta3dState, "meta3d-engine-whole-protocol", {
				...api.getExtensionState<state>(meta3dState, "meta3d-engine-whole-protocol"),
				canvas: canvas
			})

			return meta3dState
		},
		loadScene: (meta3dState, sceneGLB) => {
			let importSceneService = api.getExtensionService<importSceneService>(
				meta3dState,
				"meta3d-import-scene-protocol"
			)

			return importSceneService.loadScene(meta3dState, sceneGLB)
		},
	}
}

export let createExtensionState: createExtensionStateMeta3D<
	state
> = () => {
	return {
		canvas: null
	}
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
	return {
	}
}
