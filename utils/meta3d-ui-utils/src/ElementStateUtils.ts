import { state as meta3dState, api } from "meta3d-type"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"

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