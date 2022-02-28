// TODO sparate ui and logc:
// move ui elementName, registerExtensionSubmitEventName to protocol?

import { getExtensionService as getExtensionServiceMeta3d, createExtensionState as createExtensionStateMeta3d } from "meta3d-type/src/Index"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { state as eventState } from "meta3d-event-protocol/src/state/StateType"
import { dependentExtensionNameMap } from "meta3d-register-extension-protocol/src/service/DependentExtensionType"
import { service } from "meta3d-register-extension-protocol/src/service/ServiceType"
import { state } from "meta3d-register-extension-protocol/src/state/StateType"
import { registerExtensionElementState } from "meta3d-element-register-extension-protocol"
import { showExtensionsElementState, showRegisterAction } from "meta3d-element-show-extensions-protocol"
import { eventData as registerExtensionSubmitEventData } from "meta3d-event-register-extension-submit-protocol"
import { eventData as showExtensionEventData } from "meta3d-event-show-extension-protocol"
import { getSkinContribute as getDefaultSkinContribute } from "meta3d-skin-default"
import { getCustomControlContribute as getButtonCustomControlContribute } from "meta3d-custom-control-button"
import { skinName as defaultSkinName } from "meta3d-skin-default-protocol"
import { getElementContribute as getRegisterExtensionElementContribute } from "meta3d-element-register-extension"
import { getElementContribute as getShowExtensionsElementContribute } from "meta3d-element-show-extensions"
import { elementName as showExtensionElementName } from "meta3d-element-show-extensions-protocol"
import { getEventContribute as getRegisterExtensionSubmitEventContribute } from "meta3d-event-register-extension-submit"
import { getEventContribute as getShowExtensionEventContribute } from "meta3d-event-show-extension"

import { showExtensionReducer } from "./Reducer"

export let getExtensionService: getExtensionServiceMeta3d<
	dependentExtensionNameMap,
	service
> = (api, dependentExtensionNameMap) => {
	let { meta3dUIExtensionName, meta3dEventExtensionName } = dependentExtensionNameMap

	return {
		register: (meta3dState) => {
			let { registerElement, combineReducers } = api.getServiceExn<uiService>(meta3dState, meta3dUIExtensionName)

			let uiState = api.getExtensionStateExn<uiState>(meta3dState, meta3dUIExtensionName)





			// TODO move out to another extension
			let { registerSkin, registerCustomControl } = api.getServiceExn<uiService>(meta3dState, meta3dUIExtensionName)

			uiState = registerSkin(uiState, getDefaultSkinContribute())
			uiState = registerCustomControl(uiState, getButtonCustomControlContribute(defaultSkinName))








			uiState = registerElement<registerExtensionElementState>(uiState,
				getRegisterExtensionElementContribute(api, dependentExtensionNameMap)
			)
			uiState = registerElement<showExtensionsElementState>(uiState, getShowExtensionsElementContribute(api, dependentExtensionNameMap))

			uiState = combineReducers<showExtensionsElementState, showRegisterAction>(uiState, [showExtensionElementName, showExtensionReducer])



			meta3dState = api.setExtensionState(meta3dState, meta3dUIExtensionName, uiState)






			let { registerEvent } = api.getServiceExn<eventService>(meta3dState, meta3dEventExtensionName)

			let eventState = api.getExtensionStateExn<eventState>(meta3dState, meta3dEventExtensionName)


			eventState = registerEvent<registerExtensionSubmitEventData>(eventState, getRegisterExtensionSubmitEventContribute(api, { meta3dUIExtensionName })
			)
			eventState = registerEvent<showExtensionEventData>(eventState, getShowExtensionEventContribute(api, null))


			meta3dState = api.setExtensionState(meta3dState, meta3dEventExtensionName, eventState)

			return new Promise((resolve) => {
				resolve(meta3dState)
			})
		},
	}
}

export let createExtensionState: createExtensionStateMeta3d<
	state
> = () => {
	return null
}
