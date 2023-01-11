import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState } from "meta3d-type"
import { state } from "meta3d-engine-whole-protocol/src/state/StateType"
import { service } from "meta3d-engine-whole-protocol/src/service/ServiceType"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-engine-whole-protocol/src/service/DependentMapType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { service as engineBasicService } from "meta3d-engine-basic-protocol/src/service/ServiceType"
// import { state as engineBasicState } from "meta3d-engine-basic-protocol/src/state/StateType"
import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
// import { state as engineSceneState } from "meta3d-engine-scene-protocol/src/state/StateType"
import { service as engineRenderService } from "meta3d-engine-render-protocol/src/service/ServiceType"
// import { state as engineRenderState } from "meta3d-engine-render-protocol/src/state/StateType"
import { init, render, update } from "./DirectorAPI"

export let getExtensionService: getExtensionServiceMeta3D<
	dependentExtensionNameMap,
	dependentContributeNameMap,
	service
> = (api, [{
	meta3dBsMostExtensionName,
	meta3dEngineCoreExtensionName,
	meta3dEngineBasicExtensionName,
	meta3dEngineSceneExtensionName,
	meta3dEngineRenderExtensionName,
}, {
}]) => {
		return {
			prepare: (meta3dState: meta3dState, isDebug, canvasSize, ecsConfig, canvas) => {
				// let engineBasicState = api.getExtensionState<engineBasicState>(meta3dState, meta3dEngineBasicExtensionName)

				let engineBasicService = api.getExtensionService<engineBasicService>(
					meta3dState,
					meta3dEngineBasicExtensionName
				)

				meta3dState = engineBasicService.prepare(meta3dState, isDebug)

				// let engineSceneState = api.getExtensionState<engineSceneState>(meta3dState, meta3dEngineSceneExtensionName)

				let engineSceneService = api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionName
				)

				meta3dState = engineSceneService.prepare(meta3dState, isDebug, canvasSize, ecsConfig)


				// let engineRenderState = api.getExtensionState<engineRenderState>(meta3dState, meta3dEngineRenderExtensionName)

				let engineRenderService = api.getExtensionService<engineRenderService>(
					meta3dState,
					meta3dEngineRenderExtensionName
				)

				meta3dState = engineRenderService.prepare(meta3dState, isDebug, canvas)



				return meta3dState
			},
			init: (meta3dState: meta3dState) => {
				let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, meta3dEngineCoreExtensionName)

				let engineCoreService = api.getExtensionService<engineCoreService>(
					meta3dState,
					meta3dEngineCoreExtensionName
				)

				engineCoreState = engineCoreService.init(engineCoreState, meta3dState)



				meta3dState =
					api.setExtensionState(
						meta3dState,
						meta3dEngineCoreExtensionName,
						engineCoreState
					)



				return init(api, meta3dState, meta3dBsMostExtensionName, meta3dEngineCoreExtensionName)
			},
			update: (meta3dState: meta3dState) => {
				return update(api, meta3dState, meta3dBsMostExtensionName, meta3dEngineCoreExtensionName)
			},
			render: (meta3dState: meta3dState) => {
				return render(api, meta3dState, meta3dBsMostExtensionName, meta3dEngineCoreExtensionName)
			},
			scene: {
				gameObject: {
					createGameObject: (meta3dState) => {
						// TODO refactor: extract template funcion for get/set engineCoreState from/to meta3dState

						let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, meta3dEngineCoreExtensionName)

						let engineCoreService = api.getExtensionService<engineCoreService>(
							meta3dState,
							meta3dEngineCoreExtensionName
						)


						let engineSceneService = api.getExtensionService<engineSceneService>(
							meta3dState,
							meta3dEngineSceneExtensionName
						)

						// let [engineCoreState, gameObject] = engineSceneService.gameObject.createGameObject(engineCoreState, engineCoreService)
						let data = engineSceneService.gameObject.createGameObject(engineCoreState, engineCoreService)
						engineCoreState = data[0]




						meta3dState =
							api.setExtensionState(
								meta3dState,
								meta3dEngineCoreExtensionName,
								engineCoreState
							)

						return [meta3dState, data[1]]
					}
				}
			}
		}
	}

export let createExtensionState: createExtensionStateMeta3D<
	state
> = () => {
	return null
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
	return {
	}
}
