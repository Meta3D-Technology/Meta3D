import { state as meta3dState, api } from "meta3d-type"
import { service } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { bind, getExn, map } from "meta3d-commonlib-ts/src/NullableUtils"

export let getActionState = <actionState>(meta3dState: meta3dState, api: api, actionName: string): actionState => {
	let { getCurrentElementState } = getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

	return getExn(getCurrentElementState(meta3dState))[actionName] as actionState
}

export let getActionStateInInput = <actionState>(meta3dState: meta3dState, api: api, actionName: string): nullable<actionState> => {
	let { getCurrentElementState } = getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

	return bind(currentElementState => {
		return currentElementState[actionName]
	}, getCurrentElementState(meta3dState))
}

export let setElementStateField = ([updateStateFunc, setStateFunc]: [any, any], meta3dState: meta3dState, api: api) => {
	let { updateElementState } = getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

	meta3dState = updateElementState(meta3dState,
		(elemenetState) => {
			return setStateFunc(elemenetState, updateStateFunc(elemenetState))
		}
	)

	return meta3dState
}