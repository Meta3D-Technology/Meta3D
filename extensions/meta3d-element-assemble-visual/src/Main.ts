import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { contributeType } from "meta3d-type/src/contribute/ContributeType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap } from "./DependentMapType"
import { service } from "meta3d-element-assemble-visual-protocol/src/service/ServiceType"
import { state } from "meta3d-element-assemble-visual-protocol/src/state/StateType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
// import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { uiControlContribute } from "meta3d-ui-protocol/src/contribute/UIControlContributeType"
import { skin } from "meta3d-skin-protocol"
// import { inputData, outputData } from "meta3d-ui-control-button-protocol"
import { skinContribute } from "meta3d-ui-protocol/src/contribute/SkinContributeType"
import { isNullable, getExn } from "meta3d-commonlib-ts/src/NullableUtils"

// type data = { isDebug: boolean, canvas: HTMLCanvasElement }

let _prepareUI = (meta3dState: meta3dState, api: api, [dependentExtensionProtocolNameMap, _]: [dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap]) => {
	let { meta3dUIExtensionProtocolName } = dependentExtensionProtocolNameMap

	let uiState = api.getExtensionState<uiState>(meta3dState, meta3dUIExtensionProtocolName)



	let { registerSkin, registerUIControl } = api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionProtocolName)

	// uiState = registerSkin(uiState, api.getContribute<skinContribute<skin>>(meta3dState, meta3dSkinDefaultContributeName))
	uiState = api.getAllContributesByType<skinContribute<any>>(meta3dState, contributeType.Skin).reduce<uiState>((uiState, contribute) => {
		return registerSkin(uiState, contribute)
	}, uiState)

	// uiState = registerUIControl(uiState, api.getContribute<uiControlContribute<inputData, outputData>>(meta3dState, meta3dUIControlButtonContributeName))
	uiState = api.getAllContributesByType<uiControlContribute<any, any>>(meta3dState, contributeType.UIControl).reduce<uiState>((uiState, contribute) => {
		return registerUIControl(uiState, contribute)
	}, uiState)









	// uiState = combineReducers<button2ElementState, changeTextAction>(uiState, [button2ElementName, button2Reducer])


	meta3dState = api.setExtensionState(meta3dState, meta3dUIExtensionProtocolName, uiState)


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
			let { meta3dUIExtensionProtocolName, meta3dImguiRendererExtensionProtocolName } = dependentExtensionProtocolNameMap

			meta3dState = _prepareUI(meta3dState, api, dependentMapData)


			let { init } = api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionProtocolName)

			return init(meta3dState, [api, meta3dImguiRendererExtensionProtocolName], false, isDebug, canvas)
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
