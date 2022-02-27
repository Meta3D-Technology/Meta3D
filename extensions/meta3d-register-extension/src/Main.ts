// TODO sparate ui and logc:
// move ui id, registerExtensionSubmitEventName to protocol?

import { state as meta3dState, getExtensionService as getExtensionServiceMeta3d, createExtensionState as createExtensionStateMeta3d } from "meta3d-type/src/Index"
import { service as uiService, drawButtonData } from "meta3d-ui-protocol/src/service/ServiceType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { execFunc } from "meta3d-ui-protocol/src/contribute_points/UIType"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { state as eventState } from "meta3d-event-protocol/src/state/StateType"
import { eventHandler } from "meta3d-event-protocol/src/contribute_points/EventType"
import { dependentExtensionNameMap } from "meta3d-register-extension-protocol/src/service/DependentExtensionType"
import { service } from "meta3d-register-extension-protocol/src/service/ServiceType"
import { state, registerExtensionExecState, showExtensionExecState } from "meta3d-register-extension-protocol/src/state/StateType"
import { registerExtensionSubmitEventData, showExtensionEventData } from "meta3d-register-extension-protocol/src/service/EventType"
import { serializeLib, getExtensionServiceFuncFromLib, getCreateExtensionStateFuncFuncFromLib, traverseReducePromiseM } from "./Utils"

import { service as test1Service } from "meta3d-extension-test1/src/Main"
import { showExtensionReducer } from "./Reducer"
import { registerExtension } from "./Action"
import { showRegisterAction } from "../../../extension_protocols/meta3d-register-extension-protocol/src/contribute_points/ActionType"

function _getRegisterExtensionUIId() {
	return "registerExtension"
}

function _getShowExtensionUIId() {
	return "showExtension"
}

function _getRegisterExtensionSubmitEventName() {
	return "meta3d_event_register_extension_submit"
}

function _getShowExtensionEventName() {
	return "meta3d_event_show_extension"
}

// function _handleStateNotChange(meta3dState: meta3dState): Promise<meta3dState> {
// 	return new Promise((resolve) => {
// 		resolve(meta3dState)
// 	})
// }

let _registerExtensionExecFunc: execFunc<dependentExtensionNameMap> = ([api, { meta3dUIExtensionName, meta3dEventExtensionName }], meta3dState, id) => {
	let { isStateChange, drawButton, getExecState } = api.getServiceExn<uiService>(meta3dState, meta3dUIExtensionName)

	let uiState = api.getExtensionStateExn<uiState>(meta3dState, meta3dUIExtensionName)

	/*! TODO move id to VisualElement/Group, judge is state change there!
	
	// if (!isStateChange(uiState, id)) {
	// 	return _handleStateNotChange(meta3dState)
	// }
	*/


	// TODO use Nullable.getExn
	let { x, y, width, height, text } = getExecState<registerExtensionExecState>(uiState, _getRegisterExtensionUIId()) as registerExtensionExecState

	let drawButtonData: drawButtonData = {
		x, y, width, height, text
	}

	let data = drawButton(meta3dState,
		[api, meta3dUIExtensionName],
		drawButtonData)
	meta3dState = data[0]
	let isClick = data[1]

	if (isClick) {
		let { trigger } = api.getServiceExn<eventService>(meta3dState, meta3dEventExtensionName)

		let fileStr = `!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("ExtensionTest1",[],t):"object"==typeof exports?exports.ExtensionTest1=t():e.ExtensionTest1=t()}(self,(function(){return(()=>{"use strict";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{getExtensionService:()=>o,createExtensionState:()=>n});let o=(e,t)=>({func1:()=>{console.log("func1")}}),n=()=>null;return t})()}));`

		let lib = serializeLib(
			fileStr,
			"ExtensionTest1",
		)

		return trigger<registerExtensionSubmitEventData>(meta3dState, meta3dEventExtensionName, _getRegisterExtensionSubmitEventName(), {
			// TODO should pass by user according to drawCopyTextarea

			extensionName: "extension_test1",
			getExtensionServiceFunc: getExtensionServiceFuncFromLib(lib),
			dependentExtensionNameMap: null,
			createExtensionStateFunc: getExtensionServiceFuncFromLib(lib)
		})
	}

	return new Promise((resolve) => {
		resolve(meta3dState)
	})
}

let _showExtensionExecFunc: execFunc<dependentExtensionNameMap> = ([api, { meta3dUIExtensionName, meta3dEventExtensionName }], meta3dState, id) => {
	let { isStateChange, drawButton, getExecState } = api.getServiceExn<uiService>(meta3dState, meta3dUIExtensionName)

	let uiState = api.getExtensionStateExn<uiState>(meta3dState, meta3dUIExtensionName)


	/*! TODO move id to VisualElement/Group, judge is state change there!
	
	// if (!isStateChange(uiState, id)) {
	// 	return _handleStateNotChange(meta3dState)
	// }
	*/





	// TODO use Nullable.getExn
	let { extensionDataArr } = getExecState<showExtensionExecState>(uiState, _getShowExtensionUIId()) as showExtensionExecState

	return traverseReducePromiseM(extensionDataArr, ([meta3dState, index]: [meta3dState, number], { extensionName }) => {
		let data = drawButton(meta3dState,
			[api, meta3dUIExtensionName],
			{
				x: index * 10,
				y: 240,
				width: 20,
				height: 20,
				text: extensionName
			})
		meta3dState = data[0]
		let isClick = data[1]

		if (isClick) {
			let { trigger } = api.getServiceExn<eventService>(meta3dState, meta3dEventExtensionName)

			return trigger<showExtensionEventData>(meta3dState, meta3dEventExtensionName, _getShowExtensionEventName(), {
				extensionName: extensionName,
			}).then((meta3dState) => [meta3dState, index + 1]) as Promise<[meta3dState, number]>
		}

		return new Promise((resolve) => {
			resolve([meta3dState, index + 1])
		}) as Promise<[meta3dState, number]>
	}, [meta3dState, 0]).then(([meta3dState, _]) => meta3dState)
}

let _registerExtensionSubmitEventHandler: eventHandler<dependentExtensionNameMap, registerExtensionSubmitEventData> = ([api, { meta3dUIExtensionName }], meta3dState, { extensionName, dependentExtensionNameMap, getExtensionServiceFunc, createExtensionStateFunc }) => {
	meta3dState = api.registerExtension(meta3dState, extensionName, getExtensionServiceFunc, dependentExtensionNameMap, createExtensionStateFunc())

	let { func1 } = api.getServiceExn<test1Service>(meta3dState, extensionName)

	func1()




	let { dispatch } = api.getServiceExn<uiService>(meta3dState, meta3dUIExtensionName)

	let uiState = api.getExtensionStateExn<uiState>(meta3dState, meta3dUIExtensionName)

	uiState = dispatch(uiState, registerExtension(extensionName))



	meta3dState = api.setExtensionState(meta3dState, meta3dUIExtensionName, uiState)


	return new Promise((resolve) => {
		resolve(meta3dState)
	})
}

let _showExtensionEventHandler: eventHandler<dependentExtensionNameMap, showExtensionEventData> = ([api, { meta3dUIExtensionName }], meta3dState, { extensionName }) => {
	console.log("show extension: ", extensionName)

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
			let { register, combineReducers } = api.getServiceExn<uiService>(meta3dState, meta3dUIExtensionName)

			let uiState = api.getExtensionStateExn<uiState>(meta3dState, meta3dUIExtensionName)

			uiState = register<registerExtensionExecState>(uiState, {
				id: _getRegisterExtensionUIId(),
				// TODO use curry
				execFunc: (meta3dState, id) => _registerExtensionExecFunc([api, dependentExtensionNameMap], meta3dState, id),
				execState: {
					x: 0,
					y: 140,
					width: 20,
					height: 10,
					text: "register extension",
				}
			})
			uiState = register<showExtensionExecState>(uiState, {
				id: _getShowExtensionUIId(),
				// TODO use curry
				execFunc: (meta3dState, id) => _showExtensionExecFunc([api, dependentExtensionNameMap], meta3dState, id),
				execState: {
					extensionDataArr: []
				}
			})

			uiState = combineReducers<showExtensionExecState, showRegisterAction>(uiState, [_getShowExtensionUIId(), showExtensionReducer])



			meta3dState = api.setExtensionState(meta3dState, meta3dUIExtensionName, uiState)






			let { onCustomEvent } = api.getServiceExn<eventService>(meta3dState, meta3dEventExtensionName)

			let eventState = api.getExtensionStateExn<eventState>(meta3dState, meta3dEventExtensionName)


			eventState = onCustomEvent<registerExtensionSubmitEventData>(eventState, _getRegisterExtensionSubmitEventName(),
				// TODO use curry
				(meta3dState, eventData) => _registerExtensionSubmitEventHandler([api, dependentExtensionNameMap], meta3dState, eventData))
			eventState = onCustomEvent<showExtensionEventData>(eventState, _getShowExtensionEventName(),
				// TODO use curry
				(meta3dState, eventData) => _showExtensionEventHandler([api, dependentExtensionNameMap], meta3dState, eventData))


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
