import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { contributeType } from "meta3d-type/src/contribute/ContributeType"
import { service as uiService } from "meta3d-ui2-protocol/src/service/ServiceType"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-element-assemble-visual-protocol/src/service/DependentMapType"
import { service } from "meta3d-element-assemble-visual-protocol/src/service/ServiceType"
import { state } from "meta3d-element-assemble-visual-protocol/src/state/StateType"
import { state as uiState } from "meta3d-ui2-protocol/src/state/StateType"
// import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { uiControlContribute } from "meta3d-ui2-protocol/src/contribute/UIControlContributeType"
// import { skin } from "meta3d-skin-default-protocol"
// import { inputData, outputData } from "meta3d-ui-control-button-protocol"
import { elementState } from "meta3d-element-assemble-element-protocol"
import { elementContribute } from "meta3d-ui2-protocol/src/contribute/ElementContributeType"
import { skinContribute } from "meta3d-ui2-protocol/src/contribute/SkinContributeType"

// type data = { isDebug: boolean, canvas: HTMLCanvasElement }

let _prepareUI = (meta3dState: meta3dState, api: api, [dependentExtensionNameMap, dependentContributeNameMap]: [dependentExtensionNameMap, dependentContributeNameMap]) => {
	let { meta3dUIExtensionName } = dependentExtensionNameMap
	let {
		// meta3dSkinDefaultContributeName, meta3dUIControlButtonContributeName,
		meta3dUIViewElementContributeName,
	} = dependentContributeNameMap

	let { registerElement } = api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionName)

	let uiState = api.getExtensionState<uiState>(meta3dState, meta3dUIExtensionName)



	let { registerSkin, registerUIControl } = api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionName)

	// uiState = registerSkin(uiState, api.getContribute<skinContribute<skin>>(meta3dState, meta3dSkinDefaultContributeName))
	uiState = api.getAllContributesByType<skinContribute<any>>(meta3dState, contributeType.Skin).reduce<uiState>((uiState, contribute) => {
		return registerSkin(uiState, contribute)
	}, uiState)

	// uiState = registerUIControl(uiState, api.getContribute<uiControlContribute<inputData, outputData>>(meta3dState, meta3dUIControlButtonContributeName))
	uiState = api.getAllContributesByType<uiControlContribute<any, any>>(meta3dState, contributeType.UIControl).reduce<uiState>((uiState, contribute) => {
		return registerUIControl(uiState, contribute)
	}, uiState)









	uiState = registerElement<elementState>(uiState,
		api.getContribute<elementContribute<elementState>>(meta3dState, meta3dUIViewElementContributeName)
	)

	// uiState = combineReducers<button2ElementState, changeTextAction>(uiState, [button2ElementName, button2Reducer])


	meta3dState = api.setExtensionState(meta3dState, meta3dUIExtensionName, uiState)


	return meta3dState
}

export let getExtensionService: getExtensionServiceMeta3D<
	dependentExtensionNameMap,
	dependentContributeNameMap,
	service
> = (api, dependentMapData) => {
	let [dependentExtensionNameMap, _] = dependentMapData
	let { meta3dUIExtensionName, meta3dImguiRendererExtensionName } = dependentExtensionNameMap

	return {
		init: (meta3dState: meta3dState, { isDebug, canvas }) => {
			// let isDebug = true

			// let { meta3dUIExtensionName, meta3dImguiRendererExtensionName, meta3dEventExtensionName, meta3dBindIOEventExtensionName } = dependentExtensionNameMap
			let { meta3dUIExtensionName, meta3dImguiRendererExtensionName } = dependentExtensionNameMap

			meta3dState = _prepareUI(meta3dState, api, dependentMapData)


			let { init } = api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionName)

			return init(meta3dState, [api, meta3dImguiRendererExtensionName], false, isDebug, canvas)
		},
		update: (meta3dState: meta3dState, { clearColor }) => {
			let { render, clear } = api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionName)

			clear(meta3dState, [api, meta3dImguiRendererExtensionName], clearColor)

			// TODO get time from outside
			let time = 0.0

			return render(meta3dState, [meta3dUIExtensionName, meta3dImguiRendererExtensionName], time)
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
			console.log("meta3d-element-assemble-visual onRegister")
			return meta3dState
		},
		onInit: (meta3dState, service, data) => {
			console.log("meta3d-element-assemble-visual onInit")

			return new Promise((resolve) => {
				resolve(service.init(meta3dState, data))
			})
		},
		onUpdate: (meta3dState, service, data) => {
			console.log("meta3d-element-assemble-visual onUpdate")

			return service.update(meta3dState, data)
		}
	}
}
