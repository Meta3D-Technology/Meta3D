import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { ioData } from "meta3d-ui-protocol/src/state/StateType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-use-editor-protocol/src/service/DependentMapType"
import { service } from "meta3d-use-editor-protocol/src/service/ServiceType"
import { state } from "meta3d-use-editor-protocol/src/state/StateType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { state as eventState } from "meta3d-event-protocol/src/state/StateType"
import { skinContribute } from "meta3d-ui-protocol/src/contribute/SkinContributeType"
import { customControlContribute } from "meta3d-ui-protocol/src/contribute/CustomControlContributeType"
import { buttonStyle } from "meta3d-skin-default-protocol"
import { inputData, outputData, customControlName } from "meta3d-custom-control-button-protocol"
import { elementState as buttonElementState } from "meta3d-element-button-protocol"
import { elementName as button2ElementName, changeTextAction, elementState as button2ElementState } from "meta3d-element-button2-protocol"
import { elementContribute } from "meta3d-ui-protocol/src/contribute/ElementContributeType"
import { eventData as clickButtonEventData } from "meta3d-event-click-button-protocol"
import { eventContribute } from "meta3d-event-protocol/src/contribute/EventContributeType"
import { button2Reducer } from "./Reducer"


// TODO move to UI extension 
let _ioData: ioData = {
	isPointDown: false,
	pointPosition: [0, 0]
}

let _prepareButton = (meta3dState: meta3dState, api: api, [dependentExtensionNameMap, dependentContributeNameMap]: [dependentExtensionNameMap, dependentContributeNameMap]) => {
	let { meta3dUIExtensionName, meta3dEventExtensionName } = dependentExtensionNameMap
	let { meta3dSkinDefaultContributeName, meta3dCustomControlButtonContributeName, meta3dElementButtonContributeName,
		meta3dElementButton2ContributeName, meta3dEventClickButtonContributeName } = dependentContributeNameMap

	let { registerElement, combineReducers } = api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionName)

	let uiState = api.getExtensionState<uiState>(meta3dState, meta3dUIExtensionName)





	// TODO move out to another extension
	let { registerSkin, registerCustomControl } = api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionName)

	uiState = registerSkin(uiState, api.getContribute<skinContribute<buttonStyle>>(meta3dState, meta3dSkinDefaultContributeName))

	// uiState = registerCustomControl(uiState, getButtonCustomControlContribute(defaultSkinName))
	uiState = registerCustomControl(uiState, api.getContribute<customControlContribute<inputData, outputData>>(meta3dState, meta3dCustomControlButtonContributeName))








	uiState = registerElement<buttonElementState>(uiState,
		api.getContribute<elementContribute<buttonElementState>>(meta3dState, meta3dElementButtonContributeName)
	)
	uiState = registerElement<button2ElementState>(uiState,
		api.getContribute<elementContribute<button2ElementState>>(meta3dState, meta3dElementButton2ContributeName)
	)


	uiState = combineReducers<button2ElementState, changeTextAction>(uiState, [button2ElementName, button2Reducer])



	meta3dState = api.setExtensionState(meta3dState, meta3dUIExtensionName, uiState)






	let { registerEvent } = api.getExtensionService<eventService>(meta3dState, meta3dEventExtensionName)

	let eventState = api.getExtensionState<eventState>(meta3dState, meta3dEventExtensionName)


	eventState = registerEvent<clickButtonEventData>(eventState, api.getContribute<eventContribute<clickButtonEventData>>(meta3dState, meta3dEventClickButtonContributeName)
	)


	meta3dState = api.setExtensionState(meta3dState, meta3dEventExtensionName, eventState)

	return meta3dState
}


let _init = (meta3dState: meta3dState, api: api, dependentMapData: [dependentExtensionNameMap, dependentContributeNameMap]) => {
	// let { meta3dUIExtensionName, meta3dEventExtensionName } = dependentExtensionNameMap
	// let { meta3dSkinDefaultContributeName, meta3dCustomControlButtonContributeName, meta3dElementButtonContributeName, meta3dEventClickButtonContributeName } = dependentContributeNameMap

	// TODO move to UI extension 
	// TODO fix: should only one pointdown!
	document.onmousedown = (e) => {
		_ioData = {
			isPointDown: true,
			pointPosition: [e.pageX, e.pageY]
		}
	}
	document.onmouseup = (e) => {
		_ioData = {
			isPointDown: false,
			pointPosition: [e.pageX, e.pageY]
		}
	}

	meta3dState = _prepareButton(meta3dState, api, dependentMapData)

	return meta3dState
}

let _loop = (
	api: api, meta3dState: meta3dState,
	meta3dUIExtensionName: string
) => {
	let { render } = api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionName)

	render(meta3dState, meta3dUIExtensionName, _ioData).then((meta3dState: meta3dState) => {
		requestAnimationFrame(
			() => {
				_loop(api, meta3dState, meta3dUIExtensionName)
			}
		)
	})

}

export let getExtensionService: getExtensionServiceMeta3D<
	dependentExtensionNameMap,
	dependentContributeNameMap,
	service
> = (api, [dependentExtensionNameMap, dependentContributeNameMap]) => {
	let { meta3dUIExtensionName } = dependentExtensionNameMap

	return {
		run: (meta3dState: meta3dState) => {
			meta3dState = _init(meta3dState, api, [dependentExtensionNameMap, dependentContributeNameMap])

			_loop(api, meta3dState, meta3dUIExtensionName)
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
			console.log("meta3d-use-editor onRegister")
			return meta3dState
		},
		onStart: (meta3dState, service) => {
			console.log("meta3d-use-editor onStart")

			service.run(meta3dState)
		}
	}
}
