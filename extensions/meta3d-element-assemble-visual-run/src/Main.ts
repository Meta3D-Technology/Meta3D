import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { contributeType } from "meta3d-type/src/ContributeType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-element-assemble-visual-run-protocol/src/service/DependentMapType"
import { service } from "meta3d-element-assemble-visual-run-protocol/src/service/ServiceType"
import { state } from "meta3d-element-assemble-visual-run-protocol/src/state/StateType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { service as bindIOEventService } from "meta3d-bind-io-event-protocol/src/service/ServiceType"
import { state as eventState } from "meta3d-event-protocol/src/state/StateType"
import { uiControlContribute } from "meta3d-ui-protocol/src/contribute/UIControlContributeType"
import { elementState } from "meta3d-element-assemble-element-protocol"
import { elementContribute } from "meta3d-ui-protocol/src/contribute/ElementContributeType"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { skinContribute } from "meta3d-ui-protocol/src/contribute/SkinContributeType"

let _prepareButton = (meta3dState: meta3dState, api: api, [dependentExtensionNameMap, dependentContributeNameMap]: [dependentExtensionNameMap, dependentContributeNameMap]) => {
	let { meta3dEventExtensionName, meta3dUIExtensionName } = dependentExtensionNameMap
	let {
		meta3dUIViewElementContributeName,
	} = dependentContributeNameMap

	let { registerElement } = api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionName)

	let uiState = api.getExtensionState<uiState>(meta3dState, meta3dUIExtensionName)



	let { registerSkin, registerUIControl } = api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionName)

	uiState = api.getAllContributesByType<skinContribute<any>>(meta3dState, contributeType.Skin).reduce<uiState>((uiState, contribute) => {
		return registerSkin(uiState, contribute)
	}, uiState)

	uiState = api.getAllContributesByType<uiControlContribute<any, any>>(meta3dState, contributeType.UIControl).reduce<uiState>((uiState, contribute) => {
		return registerUIControl(uiState, contribute)
	}, uiState)









	uiState = registerElement<elementState>(uiState,
		api.getContribute<elementContribute<elementState>>(meta3dState, meta3dUIViewElementContributeName)
	)



	meta3dState = api.setExtensionState(meta3dState, meta3dUIExtensionName, uiState)




	let { registerAction } = api.getExtensionService<eventService>(meta3dState, meta3dEventExtensionName)

	let eventState = api.getExtensionState<eventState>(meta3dState, meta3dEventExtensionName)



	eventState = api.getAllContributesByType<actionContribute<any>>(meta3dState, contributeType.Action).reduce<eventState>((eventState, contribute) => {
		return registerAction(eventState, contribute)
	}, eventState)


	meta3dState = api.setExtensionState(meta3dState, meta3dEventExtensionName, eventState)





	return meta3dState
}

export let getExtensionService: getExtensionServiceMeta3D<
	dependentExtensionNameMap,
	dependentContributeNameMap,
	service
> = (api, dependentMapData) => {
	let [dependentExtensionNameMap, _] = dependentMapData
	let { meta3dBindIOEventExtensionName, meta3dUIExtensionName, meta3dImguiRendererExtensionName } = dependentExtensionNameMap

	return {
		init: (meta3dState: meta3dState, { isDebug, canvas }) => {
			let { meta3dUIExtensionName, meta3dImguiRendererExtensionName, meta3dEventExtensionName, meta3dBindIOEventExtensionName } = dependentExtensionNameMap

			meta3dState = _prepareButton(meta3dState, api, dependentMapData)



			let { init } = api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionName)

			meta3dState = init(meta3dState, [api, meta3dImguiRendererExtensionName], isDebug, canvas)



			let { initEvent, setBody, setBrowser, setCanvas, getBrowserChromeType } = api.getExtensionService<eventService>(meta3dState, meta3dEventExtensionName)

			meta3dState = setBody(meta3dState, meta3dEventExtensionName, document.body as HTMLBodyElement)
			meta3dState = setBrowser(meta3dState, meta3dEventExtensionName, getBrowserChromeType())
			meta3dState = setCanvas(meta3dState, meta3dEventExtensionName, canvas)

			meta3dState = initEvent(meta3dState, meta3dEventExtensionName)




			let { bindIOEvent } = api.getExtensionService<bindIOEventService>(meta3dState, meta3dBindIOEventExtensionName)

			bindIOEvent(meta3dState)



			return meta3dState
		},
		update: (meta3dState: meta3dState, { clearColor }) => {
			let { getIOData, resetIOData } = api.getExtensionService<bindIOEventService>(meta3dState, meta3dBindIOEventExtensionName)

			let { render, clear } = api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionName)

			clear(meta3dState, [api, meta3dImguiRendererExtensionName], clearColor)

			return render(meta3dState, [meta3dUIExtensionName, meta3dImguiRendererExtensionName], getIOData()).then((meta3dState: meta3dState) => {
				resetIOData()

				return meta3dState
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
			return meta3dState
		},
		onInit: (meta3dState, service, data) => {
			return new Promise((resolve) => {
				resolve(service.init(meta3dState, data))
			})
		},
		onUpdate: (meta3dState, service, data) => {
			return service.update(meta3dState, data)
		}
	}
}
