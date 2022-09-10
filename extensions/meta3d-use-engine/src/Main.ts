import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { state } from "meta3d-use-engine-protocol/src/state/StateType"
import { service } from "meta3d-use-engine-protocol/src/service/ServiceType"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-use-engine-protocol/src/service/DependentMapType"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { workPluginContribute } from "meta3d-engine-core-protocol/src/contribute/work/WorkPluginContributeType"
import { state as webgpuTriangleState, states as webgpuTriangleStates } from "meta3d-work-plugin-webgpu-triangle-protocol/src/StateType";
import { state as rootState, states as rootStates } from "meta3d-work-plugin-root-protocol/src/StateType";
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"

let _runPipeline = (api: api, meta3dState: meta3dState, engineCoreState: engineCoreState,
	meta3dBsMostExtensionName: string,
	meta3dEngineCoreExtensionName: string,
	pipelineName: string): Promise<meta3dState> => {
	let tempMeta3DState: nullable<meta3dState> = null

	let { map } = api.getExtensionService<mostService>(
		meta3dState,
		meta3dBsMostExtensionName
	)

	let { runPipeline } = api.getExtensionService<engineCoreService>(
		meta3dState,
		meta3dEngineCoreExtensionName
	)

	return map(
		(engineCoreState: engineCoreState) => {
			tempMeta3DState = api.setExtensionState(
				meta3dState,
				meta3dEngineCoreExtensionName,
				engineCoreState
			)

			return null
		},
		runPipeline(engineCoreState, meta3dState, pipelineName)
	).drain().then((_) => {
		return getExn(tempMeta3DState)
	})
}

let _loop = (
	api: api, meta3dState: meta3dState,
	meta3dBsMostExtensionName: string,
	meta3dEngineCoreExtensionName: string
): Promise<void> => {
	return _runPipeline(api, meta3dState, api.getExtensionState<engineCoreState>(meta3dState, meta3dEngineCoreExtensionName), meta3dBsMostExtensionName, meta3dEngineCoreExtensionName, "update").then((meta3dState) => {
		_runPipeline(api, meta3dState, api.getExtensionState<engineCoreState>(meta3dState, meta3dEngineCoreExtensionName), meta3dBsMostExtensionName, meta3dEngineCoreExtensionName, "render").then((meta3dState) => {
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

export let getExtensionService: getExtensionServiceMeta3D<
	dependentExtensionNameMap,
	dependentContributeNameMap,
	service
> = (api, [{ meta3dBsMostExtensionName,
	meta3dEngineCoreExtensionName,
}, {
	meta3dWorkPluginRootContributeName,
	meta3dWorkPluginWebGPUTriangleContributeName
}]) => {
		return {
			run: (meta3dState: meta3dState) => {
				let isDebug = true

				let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, meta3dEngineCoreExtensionName)

				let { setIsDebug, registerWorkPlugin } = api.getExtensionService<engineCoreService>(
					meta3dState,
					meta3dEngineCoreExtensionName
				)

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

				let { init } = api.getExtensionService<engineCoreService>(
					meta3dState,
					meta3dEngineCoreExtensionName
				)

				engineCoreState = init(engineCoreState, meta3dState)

				meta3dState =
					api.setExtensionState(
						meta3dState,
						meta3dEngineCoreExtensionName,
						engineCoreState
					)

				_runPipeline(api, meta3dState, engineCoreState, meta3dBsMostExtensionName, meta3dEngineCoreExtensionName, "init").then((meta3dState) => {
					_loop(
						api, meta3dState,
						meta3dBsMostExtensionName,
						meta3dEngineCoreExtensionName
					)
				})
			},
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
