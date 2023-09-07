import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D } from "meta3d-type"
import { state } from "meta3d-editor-run-engine-gameview-protocol/src/state/StateType"
import { service } from "meta3d-editor-run-engine-gameview-protocol/src/service/ServiceType"
import { getExtensionServiceUtils } from "meta3d-editor-webgl1-three-run-engine-utils/src/Main"
import { actionName, state as runState } from "meta3d-action-run-protocol"
import { getActionState } from "meta3d-ui-utils/src/ElementStateUtils"

export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
	let funcs = getExtensionServiceUtils(api, "meta3d-engine-whole-gameview-protocol")

	return {
		...funcs,
		loopEngineWhenStop: (meta3dState) => {
			if (
				!(getActionState<runState>(meta3dState, api, actionName).isRun)
			) {
				return funcs.loopEngine(meta3dState)
			}

			return new Promise((resolve) => {
				resolve(meta3dState)
			})
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
