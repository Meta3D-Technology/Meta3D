import { state as meta3dState, api } from "meta3d-type"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { bind, getExn, map } from "meta3d-commonlib-ts/src/NullableUtils"

export let getActionState = <actionState>(meta3dState: meta3dState, api: api, actionName: string): actionState => {
	let { getCurrentElementState } = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")

	let uiState = api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol")

	return getExn(getCurrentElementState(uiState))[actionName] as actionState
}

export let getActionStateInUIControl = <actionState>(meta3dState: meta3dState, api: api, actionName: string): nullable<actionState> => {
	let { getCurrentElementState } = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")

	let uiState = api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol")

	return bind(currentElementState => {
		return currentElementState[actionName]
	}, getCurrentElementState(uiState))
}

export let setElementStateField = ([updateStateFunc, setStateFunc]: [any, any], meta3dState: meta3dState, api: api) => {
	let { updateElementState } = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")

	let uiState = api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol")

	uiState = updateElementState(uiState,
		(elemenetState) => {
			return setStateFunc(elemenetState, updateStateFunc(elemenetState))
		}
	)

	meta3dState = api.setExtensionState(meta3dState, "meta3d-ui-protocol", uiState)

	return meta3dState
}