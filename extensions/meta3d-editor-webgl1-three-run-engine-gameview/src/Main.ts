import { state as meta3dState, getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, api } from "meta3d-type"
import { state } from "meta3d-editor-run-engine-gameview-protocol/src/state/StateType"
import { service } from "meta3d-editor-run-engine-gameview-protocol/src/service/ServiceType"
import { addToLoopFuncs, removeFromLoopFuncs, prepareAndInitEngine, loopEngine } from "meta3d-editor-webgl1-three-run-engine-utils/src/Main"
import { actionName, state as runState } from "meta3d-action-run-protocol"
import { getActionState } from "meta3d-ui-utils/src/ElementStateUtils"

let _getRunId = () => "gameview_run"

export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
	return {
		prepareAndInitEngine: (meta3dState, gl, canvas, isDebug) => {
			return prepareAndInitEngine(meta3dState, api, gl, canvas, isDebug, "meta3d-engine-whole-gameview-protocol").then(meta3dState => {
				return addToLoopFuncs(meta3dState, api, {
					id: "gameview_once",
					func: (meta3dState: meta3dState) => {
						return loopEngine(meta3dState, api, "meta3d-engine-whole-gameview-protocol")
					},
					onlyOnce: true
				})
			})
		},
		loopEngineWhenStop: (meta3dState) => {
			if (
				!(getActionState<runState>(meta3dState, api, actionName).isRun)
			) {
				return loopEngine(meta3dState, api, "meta3d-engine-whole-gameview-protocol")
			}

			return new Promise((resolve) => {
				resolve(meta3dState)
			})
		},
		addToLoopFuncs: (meta3dState) => {
			return addToLoopFuncs(meta3dState, api, {
				id: _getRunId(),
				func: (meta3dState: meta3dState) => {
					return loopEngine(meta3dState, api, "meta3d-engine-whole-gameview-protocol")
				},
				onlyOnce: false
			})
		},
		removeFromLoopFuncs: (meta3dState) => {
			return removeFromLoopFuncs(meta3dState, (({ id }) => id != _getRunId()), api)
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
