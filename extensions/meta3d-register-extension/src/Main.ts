// TODO sparate ui and logc:
// move ui id, registerExtensionSubmitEventName to protocol?

import { getExtensionService as getExtensionServiceMeta3d, createExtensionState as createExtensionStateMeta3d } from "meta3d-type/src/Index"
import { service as uiService, drawButtonData } from "meta3d-ui-protocol/src/service/ServiceType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { execFunc } from "meta3d-ui-protocol/src/contribute_points/UIType"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { state as eventState } from "meta3d-event-protocol/src/state/StateType"
import { eventHandler } from "meta3d-event-protocol/src/contribute_points/EventType"
import { dependentExtensionNameMap } from "meta3d-register-extension-protocol/src/service/DependentExtensionType"
import { service } from "meta3d-register-extension-protocol/src/service/ServiceType"
import { state, execState } from "meta3d-register-extension-protocol/src/state/StateType"
import { registerExtensionSubmitEventData } from "meta3d-register-extension-protocol/src/service/EventType"
import { serialize } from "./Utils"

import { service as test1Service } from "meta3d-extension-test1/src/Main"

function _getUIId() {
	return "registerExtension"
}

function _getRegisterExtensionSubmitEventName() {
	return "meta3d_event_register_extension_submit"
}

let _execFunc: execFunc<dependentExtensionNameMap> = ([api, { meta3dUIExtensionName, meta3dEventExtensionName }], meta3dState) => {
	let { drawButton, getExecState } = api.getServiceExn<uiService>(meta3dState, meta3dUIExtensionName)

	let uiState = api.getExtensionStateExn<uiState>(meta3dState, meta3dUIExtensionName)

	// TODO use Nullable.getExn
	let { x, y, width, height, text } = getExecState<execState>(uiState, _getUIId()) as execState

	let drawButtonData: drawButtonData = {
		x, y, width, height, text
	}

	return drawButton(meta3dState, drawButtonData, (meta3dState) => {
		let { trigger } = api.getServiceExn<eventService>(meta3dState, meta3dEventExtensionName)

		let fileStr = `!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("ExtensionTest1",[],t):"object"==typeof exports?exports.ExtensionTest1=t():e.ExtensionTest1=t()}(self,(function(){return(()=>{"use strict";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{getExtensionService:()=>o,createExtensionState:()=>n});let o=(e,t)=>({func1:()=>{console.log("func1")}}),n=()=>null;return t})()}));`

		return trigger<registerExtensionSubmitEventData>(meta3dState, meta3dEventExtensionName, _getRegisterExtensionSubmitEventName(), {
			// TODO should pass by user according to drawCopyTextarea

			extensionName: "extension_test1",
			// TODO perf: serialize once
			// TODO not pass 				"getExtensionService", 				"createExtensionState"
			getExtensionServiceFunc: serialize(
				fileStr,
				"ExtensionTest1",
				"getExtensionService"
			),
			dependentExtensionNameMap: null,
			createExtensionStateFunc: serialize(
				fileStr,
				"ExtensionTest1",
				"createExtensionState"
			)
		})
	})
}

let _eventHandler: eventHandler<dependentExtensionNameMap, registerExtensionSubmitEventData> = ([api, { meta3dUIExtensionName }], meta3dState, { extensionName, dependentExtensionNameMap, getExtensionServiceFunc, createExtensionStateFunc }) => {
	meta3dState = api.registerExtension(meta3dState, extensionName, getExtensionServiceFunc, dependentExtensionNameMap, createExtensionStateFunc())

	let { func1 } = api.getServiceExn<test1Service>(meta3dState, extensionName)

	func1()

	return new Promise((resolve) => {
		resolve(meta3dState)
	})
}

export let getExtensionService: getExtensionServiceMeta3d<
	dependentExtensionNameMap,
	service
> = (api, dependentExtensionNameMap) => {
	let { meta3dUIExtensionName, meta3dEventExtensionName } = dependentExtensionNameMap

	return {
		register: (meta3dState) => {
			let { register } = api.getServiceExn<uiService>(meta3dState, meta3dUIExtensionName)

			let uiState = api.getExtensionStateExn<uiState>(meta3dState, meta3dUIExtensionName)

			uiState = register<execState>(uiState, {
				id: _getUIId(),
				// TODO use curry
				execFunc: (meta3dState) => _execFunc([api, dependentExtensionNameMap], meta3dState),
				execState: {
					x: 0,
					y: 140,
					width: 20,
					height: 10,
					text: "register extension",
				}
			})


			meta3dState = api.setExtensionState(meta3dState, meta3dUIExtensionName, uiState)


			let { onCustomEvent } = api.getServiceExn<eventService>(meta3dState, meta3dEventExtensionName)

			let eventState = api.getExtensionStateExn<eventState>(meta3dState, meta3dEventExtensionName)


			eventState = onCustomEvent<registerExtensionSubmitEventData>(eventState, _getRegisterExtensionSubmitEventName(),
				// TODO use curry
				(meta3dState, eventData) => _eventHandler([api, dependentExtensionNameMap], meta3dState, eventData))


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
