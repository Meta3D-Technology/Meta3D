import { state as meta3dState, getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D } from "meta3d-type"
import { state, func } from "meta3d-editor-run-engine-protocol/src/state/StateType"
import { service } from "meta3d-editor-run-engine-protocol/src/service/ServiceType"
import { addToLoopFuncs, removeFromLoopFuncs, prepareAndInitEngine, loopEngine } from "meta3d-editor-webgl1-three-run-engine-utils/src/Main"
import { service as engineWholeService } from "meta3d-engine-whole-protocol/src/service/ServiceType"
import { state as runEngineState } from "meta3d-editor-run-engine-protocol/src/state/StateType"

let _execLoopFuncs = (meta3dState: meta3dState, loopFuncs: Array<func>): Promise<meta3dState> => {
	if (loopFuncs.length == 0) {
		return new Promise((resolve) => {
			resolve(meta3dState)
		})
	}

	let func = loopFuncs.shift()

	return func(meta3dState).then(meta3dState => {
		return _execLoopFuncs(meta3dState, loopFuncs)
	})
}

export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
	return {
		prepareAndInitEngine: (meta3dState, gl, canvas, isDebug) => {
			return prepareAndInitEngine<engineWholeService>(meta3dState, api, gl, canvas, isDebug, "meta3d-engine-whole-protocol").then(meta3dState => {
				return addToLoopFuncs<runEngineState>(meta3dState, api, {
					id: "default",
					func: (meta3dState: meta3dState) => {
						return loopEngine<engineWholeService>(meta3dState, api, "meta3d-engine-whole-protocol")
					},
					onlyOnce: false
				})
			})
		},
		loopEngine: (meta3dState) => {
			let state = api.getExtensionState<state>(meta3dState, "meta3d-editor-run-engine-protocol")

			return _execLoopFuncs(meta3dState, state.loopFuncs.map(({ func }) => func)).then(meta3dState => {
				return removeFromLoopFuncs<runEngineState>(meta3dState, (({ onlyOnce }) => !onlyOnce), api)
			})
		},
	}
}

export let createExtensionState: createExtensionStateMeta3D<
	state
> = () => {
	return {
		loopFuncs: []
	}
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
	return {
		onDeepCopy: (meta3dState) => {
			let state = api.getExtensionState<state>(meta3dState, extensionProtocolName)

			return api.setExtensionState<state>(meta3dState, extensionProtocolName, {
				...state,
				loopFuncs: state.loopFuncs.slice()
			})
		}
	}
}
