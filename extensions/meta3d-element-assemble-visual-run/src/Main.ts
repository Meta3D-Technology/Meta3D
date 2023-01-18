import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { contributeType } from "meta3d-type/src/contribute/ContributeType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap } from "meta3d-element-assemble-visual-run-protocol/src/service/DependentMapType"
import { service } from "meta3d-element-assemble-visual-run-protocol/src/service/ServiceType"
import { state } from "meta3d-element-assemble-visual-run-protocol/src/state/StateType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { state as eventState } from "meta3d-event-protocol/src/state/StateType"
import { uiControlContribute } from "meta3d-ui-protocol/src/contribute/UIControlContributeType"
import { elementState } from "meta3d-element-assemble-element-protocol"
import { elementContribute } from "meta3d-ui-protocol/src/contribute/ElementContributeType"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { skinContribute } from "meta3d-ui-protocol/src/contribute/SkinContributeType"
import { skin } from "meta3d-skin-protocol"
import { isNullable, getExn } from "meta3d-commonlib-ts/src/NullableUtils"

let _prepareUI = (meta3dState: meta3dState, api: api, [dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap]: [dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap]) => {
	let { meta3dEventExtensionProtocolName, meta3dUIExtensionProtocolName } = dependentExtensionProtocolNameMap
	let {
		meta3dUIViewElementContributeName,
	} = dependentContributeProtocolNameMap

	let { registerElement } = api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionProtocolName)

	let uiState = api.getExtensionState<uiState>(meta3dState, meta3dUIExtensionProtocolName)



	let { registerSkin, registerUIControl } = api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionProtocolName)

	uiState = api.getAllContributesByType<skinContribute<any>>(meta3dState, contributeType.Skin).reduce<uiState>((uiState, contribute) => {
		return registerSkin(uiState, contribute)
	}, uiState)

	uiState = api.getAllContributesByType<uiControlContribute<any, any>>(meta3dState, contributeType.UIControl).reduce<uiState>((uiState, contribute) => {
		return registerUIControl(uiState, contribute)
	}, uiState)









	uiState = registerElement<elementState>(uiState,
		api.getContribute<elementContribute<elementState>>(meta3dState, meta3dUIViewElementContributeName)
	)



	meta3dState = api.setExtensionState(meta3dState, meta3dUIExtensionProtocolName, uiState)




	let { registerAction } = api.getExtensionService<eventService>(meta3dState, meta3dEventExtensionProtocolName)

	let eventState = api.getExtensionState<eventState>(meta3dState, meta3dEventExtensionProtocolName)



	eventState = api.getAllContributesByType<actionContribute<any>>(meta3dState, contributeType.Action).reduce<eventState>((eventState, contribute) => {
		return registerAction(eventState, contribute)
	}, eventState)


	meta3dState = api.setExtensionState(meta3dState, meta3dEventExtensionProtocolName, eventState)





	return meta3dState
}

export let getExtensionService: getExtensionServiceMeta3D<
	dependentExtensionProtocolNameMap,
	dependentContributeProtocolNameMap,
	service
> = (api, dependentMapData) => {
	let [dependentExtensionProtocolNameMap, _] = dependentMapData
	let { meta3dUIExtensionProtocolName, meta3dImguiRendererExtensionProtocolName } = dependentExtensionProtocolNameMap

	return {
		init: (meta3dState: meta3dState, { isDebug, canvas }) => {
			// let isDebug = true

			// let { meta3dUIExtensionProtocolName, meta3dImguiRendererExtensionProtocolName, meta3dEventExtensionProtocolName, meta3dBindIOEventExtensionProtocolName } = dependentExtensionProtocolNameMap
			let { meta3dUIExtensionProtocolName, meta3dImguiRendererExtensionProtocolName } = dependentExtensionProtocolNameMap

			meta3dState = _prepareUI(meta3dState, api, dependentMapData)


			let { init } = api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionProtocolName)

			return init(meta3dState, [api, meta3dImguiRendererExtensionProtocolName], true, isDebug, canvas)
		},
		update: (meta3dState: meta3dState, { clearColor, time, skinName }) => {
			let { getSkin, render, clear, setStyle } = api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionProtocolName)

			let uiState = api.getExtensionState<uiState>(meta3dState, meta3dUIExtensionProtocolName)

			if (!isNullable(skinName)) {
				let skin = getSkin<skin>(uiState, skinName)
				if (!isNullable(skin)) {
					meta3dState = setStyle(meta3dState, getExn(skin).skin.style)
				}
			}



			meta3dState = clear(meta3dState, [api, meta3dImguiRendererExtensionProtocolName], clearColor)

			return render(meta3dState, [meta3dUIExtensionProtocolName, meta3dImguiRendererExtensionProtocolName], time)
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
