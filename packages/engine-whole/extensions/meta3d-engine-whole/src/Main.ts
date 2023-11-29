import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { initFunc, state } from "meta3d-engine-whole-protocol/src/state/StateType"
import { service } from "meta3d-engine-whole-protocol/src/service/ServiceType"
import { service as coreService } from "meta3d-core-protocol/src/service/ServiceType"
import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { reducePromise } from "meta3d-structure-utils/src/ArrayUtils"
import { init, update, render } from "meta3d-whole-utils/src/DirectorAPI"
import { service as loadSceneService } from "meta3d-load-scene-protocol/src/service/ServiceType"

let _execAllInitFuncs = (meta3dState, initFuncs, canvas) => {
	return reducePromise<meta3dState, initFunc>(initFuncs.toArray(), (meta3dState, initFunc) => initFunc(meta3dState, canvas), meta3dState)
}

export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
	return {
		scene: meta3dState => getExn(api.getPackageService(meta3dState, "meta3d-engine-scene-protocol")),
		prepare: (meta3dState, isDebug, ecsConfig) => {
			meta3dState = getExn(api.getPackageService<coreService>(
				meta3dState,
				"meta3d-core-protocol"
			)).engineBasic(meta3dState).prepare(meta3dState, isDebug)

			let engineSceneService = getExn(api.getPackageService<engineSceneService>(
				meta3dState,
				"meta3d-engine-scene-protocol"
			))
			meta3dState = engineSceneService.prepare(meta3dState, isDebug, ecsConfig)

			return meta3dState
		},
		init: (meta3dState, canvas) => {
			return _execAllInitFuncs(meta3dState, api.getExtensionState<state>(meta3dState, "meta3d-engine-whole-protocol").initFuncs, canvas).then(meta3dState => {
				let engineCoreService = getExn(api.getPackageService<coreService>(
					meta3dState,
					"meta3d-core-protocol"
				)).engineCore(meta3dState)

				meta3dState = engineCoreService.init(meta3dState)

				return init(api, meta3dState)
			})
		},
		update: (meta3dState) => {
			return update(api, meta3dState)
		},
		render: (meta3dState) => {
			return render(api, meta3dState)
		},
		loadScene: (meta3dState, sceneGLB) => {
			let loadSceneService = api.getExtensionService<loadSceneService>(
				meta3dState,
				"meta3d-load-scene-protocol"
			)

			return loadSceneService.loadScene(meta3dState, sceneGLB)
		},
		addToInitFuncs: (meta3dState, func) => {
			let state = api.getExtensionState<state>(meta3dState, "meta3d-engine-whole-protocol")

			return api.setExtensionState(meta3dState, "meta3d-engine-whole-protocol", {
				...state,
				initFuncs: state.initFuncs.push(func)
			})
		},
	}
}

export let createExtensionState: createExtensionStateMeta3D<
	state
> = (meta3dState, api) => {
	return {
		initFuncs: api.immutable.createList(meta3dState),
	}
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
	return {
	}
}
