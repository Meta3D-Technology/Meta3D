import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api, canvasData } from "meta3d-type"
import { contributeType } from "meta3d-type/src/contribute/ContributeType"
import { service as uiService } from "meta3d-ui2-protocol/src/service/ServiceType"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-use-editor-protocol/src/service/DependentMapType"
import { configData, service } from "meta3d-use-editor-protocol/src/service/ServiceType"
import { state } from "meta3d-use-editor-protocol/src/state/StateType"
import { state as uiState } from "meta3d-ui2-protocol/src/state/StateType"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
// import { service as bindIOEventService } from "meta3d-bind-io-event-protocol/src/service/ServiceType"
import { state as eventState } from "meta3d-event-protocol/src/state/StateType"
// import { skinContribute } from "meta3d-ui-protocol/src/contribute/SkinContributeType"
import { uiControlContribute } from "meta3d-ui2-protocol/src/contribute/UIControlContributeType"
import { elementContribute } from "meta3d-ui2-protocol/src/contribute/ElementContributeType"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"

let _prepareUI = (meta3dState: meta3dState, api: api, [dependentExtensionNameMap, _]: [dependentExtensionNameMap, dependentContributeNameMap]) => {
	let { meta3dEventExtensionName, meta3dUIExtensionName } = dependentExtensionNameMap


	let { registerElement } = api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionName)

	let uiState = api.getExtensionState<uiState>(meta3dState, meta3dUIExtensionName)





	let { registerSkin, registerUIControl } = api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionName)

	// uiState = api.getAllContributesByType<skinContribute<any>>(meta3dState, contributeType.Skin).reduce<uiState>((uiState, contribute) => {
	// 	return registerSkin(uiState, contribute)
	// }, uiState)


	uiState = api.getAllContributesByType<uiControlContribute<any, any>>(meta3dState, contributeType.UIControl).reduce<uiState>((uiState, contribute) => {
		return registerUIControl(uiState, contribute)
	}, uiState)








	uiState = api.getAllContributesByType<elementContribute<any>>(meta3dState, contributeType.Element).reduce<uiState>((uiState, contribute) => {
		return registerElement(uiState, contribute)
	}, uiState)



	meta3dState = api.setExtensionState(meta3dState, meta3dUIExtensionName, uiState)






	let { registerAction } = api.getExtensionService<eventService>(meta3dState, meta3dEventExtensionName)

	let eventState = api.getExtensionState<eventState>(meta3dState, meta3dEventExtensionName)


	eventState = api.getAllContributesByType<actionContribute<any>>(meta3dState, contributeType.Action).reduce<eventState>((eventState, contribute) => {
		return registerAction(eventState, contribute)
	}, eventState)


	meta3dState = api.setExtensionState(meta3dState, meta3dEventExtensionName, eventState)

	return meta3dState
}

let _createAndInsertCanvas = ({ width, height }: canvasData) => {
	let canvas = document.createElement("canvas") as HTMLCanvasElement;

	canvas.width = width
	canvas.style.width = width + "px"
	canvas.height = height
	canvas.style.height = height + "px"

	let body = document.getElementsByTagName("body")[0];
	body.appendChild(canvas);

	return canvas
}

let _init = (meta3dState: meta3dState, api: api, dependentMapData: [dependentExtensionNameMap, dependentContributeNameMap], [canvasData, { isDebug }]: configData) => {
	let [dependentExtensionNameMap, _] = dependentMapData
	// let { meta3dUIExtensionName, meta3dImguiRendererExtensionName, meta3dEventExtensionName, meta3dBindIOEventExtensionName } = dependentExtensionNameMap
	let { meta3dUIExtensionName, meta3dImguiRendererExtensionName } = dependentExtensionNameMap

	meta3dState = _prepareUI(meta3dState, api, dependentMapData)


	let canvas = _createAndInsertCanvas(canvasData)

	let { init } = api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionName)

	// meta3dState = init(meta3dState, [api, meta3dImguiRendererExtensionName], isDebug, canvas)
	return init(meta3dState, [api, meta3dImguiRendererExtensionName], true, isDebug, canvas)



	// let { initEvent, setBody, setBrowser, setCanvas, getBrowserChromeType } = api.getExtensionService<eventService>(meta3dState, meta3dEventExtensionName)

	// meta3dState = setBody(meta3dState, meta3dEventExtensionName, document.body as HTMLBodyElement)
	// meta3dState = setBrowser(meta3dState, meta3dEventExtensionName, getBrowserChromeType())
	// meta3dState = setCanvas(meta3dState, meta3dEventExtensionName, canvas)

	// meta3dState = initEvent(meta3dState, meta3dEventExtensionName)




	// let { bindIOEvent } = api.getExtensionService<bindIOEventService>(meta3dState, meta3dBindIOEventExtensionName)

	// bindIOEvent(meta3dState)



	// return meta3dState
}

let _loop = (
	api: api, meta3dState: meta3dState,
	time: number,
	[meta3dUIExtensionName, meta3dImguiRendererExtensionName, meta3dBindIOEventExtensionName]: [string, string, string]
) => {
	// TODO move to configData?
	let clearColor: [number, number, number, number] = [1.0, 1.0, 1.0, 1.0]

	// let { getIOData, resetIOData } = api.getExtensionService<bindIOEventService>(meta3dState, meta3dBindIOEventExtensionName)

	let { render, clear } = api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionName)

	clear(meta3dState, [api, meta3dImguiRendererExtensionName], clearColor)

	// render(meta3dState, [meta3dUIExtensionName, meta3dImguiRendererExtensionName], getIOData()).then((meta3dState: meta3dState) => {
	render(meta3dState, [meta3dUIExtensionName, meta3dImguiRendererExtensionName], time).then((meta3dState: meta3dState) => {
		// resetIOData()

		requestAnimationFrame(
			(time) => {
				_loop(api, meta3dState,
					time,
					[meta3dUIExtensionName, meta3dImguiRendererExtensionName, meta3dBindIOEventExtensionName])
			}
		)
	})

}

export let getExtensionService: getExtensionServiceMeta3D<
	dependentExtensionNameMap,
	dependentContributeNameMap,
	service
> = (api, [dependentExtensionNameMap, dependentContributeNameMap]) => {
	let { meta3dUIExtensionName, meta3dImguiRendererExtensionName, meta3dBindIOEventExtensionName } = dependentExtensionNameMap

	return {
		run: (meta3dState: meta3dState, configData) => {

			_init(meta3dState, api, [dependentExtensionNameMap, dependentContributeNameMap], configData).then((meta3dState: meta3dState) => {
				_loop(api, meta3dState,
					0,
					[meta3dUIExtensionName, meta3dImguiRendererExtensionName, meta3dBindIOEventExtensionName])
			})


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
			// console.log("meta3d-use-editor onRegister")
			return meta3dState
		},
		onStart: (meta3dState, service, configData) => {
			// console.log("meta3d-use-editor onStart")

			service.run(meta3dState, configData)
		}
	}
}
