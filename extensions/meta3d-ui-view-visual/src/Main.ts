import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-ui-view-visual-protocol/src/service/DependentMapType"
import { service } from "meta3d-ui-view-visual-protocol/src/service/ServiceType"
import { state } from "meta3d-ui-view-visual-protocol/src/state/StateType"
// import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
// import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { service as bindIOEventService } from "meta3d-bind-io-event-protocol/src/service/ServiceType"

// type data = { isDebug: boolean, canvas: HTMLCanvasElement }

export let getExtensionService: getExtensionServiceMeta3D<
	dependentExtensionNameMap,
	dependentContributeNameMap,
	service
> = (api, [dependentExtensionNameMap, _]) => {
	let { meta3dBindIOEventExtensionName, meta3dUIExtensionName, meta3dImguiRendererExtensionName } = dependentExtensionNameMap

	return {
		init: (meta3dState: meta3dState, { isDebug, canvas }) => {
			// let isDebug = true

			// let { meta3dUIExtensionName, meta3dImguiRendererExtensionName, meta3dEventExtensionName, meta3dBindIOEventExtensionName } = dependentExtensionNameMap
			let { meta3dUIExtensionName, meta3dImguiRendererExtensionName } = dependentExtensionNameMap

			// meta3dState = _prepareButton(meta3dState, api, dependentMapData)


			// let canvas = _createAndInsertCanvas()

			let { init } = api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionName)

			meta3dState = init(meta3dState, [api, meta3dImguiRendererExtensionName], isDebug, canvas)



			// let { initEvent, setBody, setBrowser, setCanvas, getBrowserChromeType } = api.getExtensionService<eventService>(meta3dState, meta3dEventExtensionName)

			// meta3dState = setBody(meta3dState, meta3dEventExtensionName, document.body as HTMLBodyElement)
			// meta3dState = setBrowser(meta3dState, meta3dEventExtensionName, getBrowserChromeType())
			// meta3dState = setCanvas(meta3dState, meta3dEventExtensionName, canvas)

			// meta3dState = initEvent(meta3dState, meta3dEventExtensionName)




			// let { bindIOEvent } = api.getExtensionService<bindIOEventService>(meta3dState, meta3dBindIOEventExtensionName)

			// bindIOEvent(meta3dState)



			return meta3dState
		},
		update: (meta3dState: meta3dState) => {
			let { getIOData, resetIOData } = api.getExtensionService<bindIOEventService>(meta3dState, meta3dBindIOEventExtensionName)

			let { render } = api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionName)

			resetIOData()

			return render(meta3dState, [meta3dUIExtensionName, meta3dImguiRendererExtensionName], getIOData())
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
			console.log("meta3d-ui-view-visual onRegister")
			return meta3dState
		},
		onInit: (meta3dState, service, data) => {
			console.log("meta3d-ui-view-visual onInit")

			return new Promise((resolve) => {
				resolve(service.init(meta3dState, data))
			})
		},
		onUpdate: (meta3dState, service, _) => {
			console.log("meta3d-ui-view-visual onUpdate")

			return service.update(meta3dState)
		}
	}
}
