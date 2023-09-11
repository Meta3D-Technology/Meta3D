import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { state } from "meta3d-engine-whole-gameview-protocol/src/state/StateType"
import { service } from "meta3d-engine-whole-gameview-protocol/src/service/ServiceType"
import { service as engineBasicService } from "meta3d-engine-basic-gameview-protocol/src/service/ServiceType"
import { service as engineSceneService } from "meta3d-engine-scene-gameview-protocol/src/service/ServiceType"
import { service as engineRenderService } from "meta3d-engine-render-protocol/src/service/ServiceType"
import { getExtensionService as getEngineWholeExtensionService } from "meta3d-engine-whole-utils/src/implement/Main"
import { service as loadSceneService } from "meta3d-load-scene-protocol/src/service/ServiceType"

export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
	return {
		...getEngineWholeExtensionService(api, [
			"meta3d-bs-most-protocol",
			"meta3d-engine-core-gameview-protocol",
			"meta3d-engine-scene-gameview-protocol",
		]),
		prepare: (meta3dState: meta3dState, isDebug, ecsConfig, gl, canvas) => {
			// let engineBasicState = api.getExtensionState<engineBasicState>(meta3dState, meta3dEngineBasicExtensionProtocolName)

			let engineBasicService = api.getExtensionService<engineBasicService>(
				meta3dState,
				"meta3d-engine-basic-gameview-protocol"
			)

			meta3dState = engineBasicService.prepare(meta3dState, isDebug)

			// let engineSceneState = api.getExtensionState<engineSceneState>(meta3dState, "meta3d-engine-scene-protocol")

			let engineSceneService = api.getExtensionService<engineSceneService>(
				meta3dState,
				"meta3d-engine-scene-gameview-protocol"
			)

			meta3dState = engineSceneService.prepare(meta3dState, isDebug, ecsConfig)


			// let engineRenderState = api.getExtensionState<engineRenderState>(meta3dState, meta3dEngineRenderExtensionProtocolName)

			let engineRenderService = api.getExtensionService<engineRenderService>(
				meta3dState,
				"meta3d-engine-render-protocol"
			)

			meta3dState = engineRenderService.prepare(meta3dState, isDebug, canvas)


			meta3dState = api.setExtensionState<state>(meta3dState, "meta3d-engine-whole-gameview-protocol", {
				...api.getExtensionState<state>(meta3dState, "meta3d-engine-whole-gameview-protocol"),
				canvas: canvas
			})

			return meta3dState
		},
		loadScene: (meta3dState, sceneGLB) => {
			let loadSceneService = api.getExtensionService<loadSceneService>(
				meta3dState,
				"meta3d-load-scene-protocol"
			)

			return loadSceneService.loadScene(meta3dState, sceneGLB)
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
