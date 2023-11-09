import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { state } from "meta3d-editor-whole-protocol/src/state/StateType"
import { service } from "meta3d-editor-whole-protocol/src/service/ServiceType"

export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
	return {
		scene: {},
		ui: {
			registerElement: (meta3dState, elementContribute) => {
				console.log("registerElement")

				return meta3dState
			}
		},
		event: {},
		prepare: (meta3dState: meta3dState, isDebug, ecsConfig, gl, canvas) => {
			console.log("prepare")

			return meta3dState
		},
		init: (meta3dState, initData) => {
			console.log("init: ", initData)

			return Promise.resolve(meta3dState)
		},
		update: (meta3dState, updateData) => {
			console.log("update")

			return Promise.resolve(meta3dState)
		},
		render: (meta3dState) => {
			console.log("render")

			return Promise.resolve(meta3dState)
		},
		loadScene: (meta3dState, sceneGLB) => {
			throw new Error("not implement")
		},
		addToInitFuncs: (meta3dState, func) => {
			throw new Error("not implement")
		},
		addToUpdateFuncs: (meta3dState, func) => {
			throw new Error("not implement")
		},
		addToRenderFuncs: (meta3dState, func) => {
			throw new Error("not implement")
		},
		getPluggablePackageService: (meta3dState, packageProtocolName) => {
			// TODO check packageProtocolName shouldn't be ui, engine-scene, core, ...
			throw new Error("not implement")
		},
		run: (meta3dState: meta3dState, configData) => {
			console.log("run")
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
		onRegister: (meta3dState, service) => {
			return meta3dState
		},
		onStart: (meta3dState, service, configData) => {
			service.run(meta3dState, configData)
		},
		onInit: (meta3dState, service, data) => {
			return new Promise((resolve) => {
				resolve(service.init(meta3dState, data))
			})
		},
		onUpdate: (meta3dState, service, data) => {
			return service.update(meta3dState, data)
		}
	}
}
