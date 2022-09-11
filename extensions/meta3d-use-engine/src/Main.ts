import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { state } from "meta3d-use-engine-protocol/src/state/StateType"
import { service } from "meta3d-use-engine-protocol/src/service/ServiceType"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-use-engine-protocol/src/service/DependentMapType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { workPluginContribute } from "meta3d-engine-core-protocol/src/contribute/work/WorkPluginContributeType"
import { state as webgpuTriangleState, states as webgpuTriangleStates } from "meta3d-work-plugin-webgpu-triangle-protocol/src/StateType";
import { state as rootState, states as rootStates } from "meta3d-work-plugin-root-protocol/src/StateType";
import { addTransform, createGameObject } from "./GameObjectAPI"
import { createTransform, getLocalPosition, setLocalPosition } from "./TransformAPI"
import { init, render, update } from "./DirectorAPI"
import { componentContribute } from "meta3d-engine-core-protocol/src/contribute/scene_graph/ComponentContributeType"
import { gameObjectContribute } from "meta3d-engine-core-protocol/src/contribute/scene_graph/GameObjectContributeType"
import { state as transformState, config as transformConfig, transform, componentName as transformComponentName } from "meta3d-component-transform-protocol";
import { state as gameObjectState } from "meta3d-gameobject-protocol";


let _loop = (
	api: api, meta3dState: meta3dState,
	meta3dBsMostExtensionName: string,
	meta3dEngineCoreExtensionName: string
): Promise<void> => {
	return update(api, meta3dState,
		meta3dBsMostExtensionName,
		meta3dEngineCoreExtensionName
	).then((meta3dState) => {
		render(api, meta3dState,
			meta3dBsMostExtensionName,
			meta3dEngineCoreExtensionName
		).then((meta3dState) => {
			requestAnimationFrame(() => {
				_loop(
					api, meta3dState,
					meta3dBsMostExtensionName,
					meta3dEngineCoreExtensionName
				)
			})
		})
	})
}

let _createGameObject = (engineCoreState: engineCoreState, engineCoreService: engineCoreService) => {
	let data = createGameObject(engineCoreState, engineCoreService)
	engineCoreState = data[0]
	let gameObject = data[1]

	data = createTransform(engineCoreState, engineCoreService)
	engineCoreState = data[0]
	let transform = data[1]

	engineCoreState = addTransform(engineCoreState, engineCoreService, gameObject, transform)

	engineCoreState = setLocalPosition(engineCoreState, engineCoreService, transform, [10, 10, 10])

	console.log(getLocalPosition(engineCoreState, engineCoreService, transform))

	return engineCoreState
}

export let getExtensionService: getExtensionServiceMeta3D<
	dependentExtensionNameMap,
	dependentContributeNameMap,
	service
> = (api, [{ meta3dBsMostExtensionName,
	meta3dEngineCoreExtensionName,
}, {
	meta3dWorkPluginRootContributeName,
	meta3dWorkPluginWebGPUTriangleContributeName,
	meta3dComponentTransformContributeName,
	meta3dGameObjectContributeName
}]) => {
		return {
			run: (meta3dState: meta3dState) => {
				let isDebug = true
				let float9Array1 = new Float32Array()
				let float32Array1 = new Float32Array()
				let transformCount = 1

				let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, meta3dEngineCoreExtensionName)

				let engineCoreService = api.getExtensionService<engineCoreService>(
					meta3dState,
					meta3dEngineCoreExtensionName
				)

				let { setIsDebug, registerWorkPlugin, registerComponent, setGameObjectContribute, createAndSetComponentState, createAndSetGameObjectState } = engineCoreService

				engineCoreState = setIsDebug(engineCoreState, isDebug)

				engineCoreState = registerWorkPlugin(engineCoreState, api.getContribute<workPluginContribute<rootState, rootStates>>(meta3dState, meta3dWorkPluginRootContributeName)
				)
				engineCoreState = registerWorkPlugin(engineCoreState, api.getContribute<workPluginContribute<webgpuTriangleState, webgpuTriangleStates>>(meta3dState, meta3dWorkPluginWebGPUTriangleContributeName),
					[
						{
							pipelineName: "init",
							insertElementName: "init_root_meta3d",
							insertAction: "after"
						},
						{
							pipelineName: "render",
							insertElementName: "render_root_meta3d",
							insertAction: "after"
						}
					]
				)


				engineCoreState =
					registerComponent(engineCoreState, api.getContribute<componentContribute<transformState, transformConfig, transform>>(meta3dState, meta3dComponentTransformContributeName))

				engineCoreState = createAndSetComponentState<transformConfig>(engineCoreState, transformComponentName, {
					isDebug,
					float9Array1,
					float32Array1,
					transformCount
				})


				engineCoreState =
					setGameObjectContribute(engineCoreState, api.getContribute<gameObjectContribute<gameObjectState>>(meta3dState, meta3dGameObjectContributeName))

				engineCoreState = createAndSetGameObjectState(engineCoreState, { isDebug })



				engineCoreState = _createGameObject(engineCoreState, engineCoreService)

				engineCoreState = engineCoreService.init(engineCoreState, meta3dState)

				meta3dState =
					api.setExtensionState(
						meta3dState,
						meta3dEngineCoreExtensionName,
						engineCoreState
					)

				init(api, meta3dState,
					meta3dBsMostExtensionName,
					meta3dEngineCoreExtensionName
				).then((meta3dState) => {
					{
						_loop(
							api, meta3dState,
							meta3dBsMostExtensionName,
							meta3dEngineCoreExtensionName
						)
					}
				})
			}
		}
	}

export let createExtensionState: createExtensionStateMeta3D<
	state
> = () => {
	return null
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionName) => {
	return {
		onRegister: (meta3dState, service) => {
			console.log("meta3d-use-engine onRegister")
			return meta3dState
		},
		onStart: (meta3dState, service) => {
			console.log("meta3d-use-engine onStart")

			service.run(meta3dState)
		}
	}
}
