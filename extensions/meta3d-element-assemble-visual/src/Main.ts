import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { contributeType } from "meta3d-type/src/contribute/ContributeType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { service } from "meta3d-element-assemble-visual-protocol/src/service/ServiceType"
import { state } from "meta3d-element-assemble-visual-protocol/src/state/StateType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
// import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { skin } from "meta3d-skin-protocol"
// import { inputData, outputData } from "meta3d-ui-control-button-protocol"
import { skinContribute } from "meta3d-ui-protocol/src/contribute/SkinContributeType"
import { isNullable, getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { prepareUIControls } from "meta3d-run-utils/src/RunUtils"
import { service as runEngineService } from "meta3d-editor-run-engine-sceneview-protocol/src/service/ServiceType"
import { service as runEngineGameViewService } from "meta3d-editor-run-engine-gameview-protocol/src/service/ServiceType"

// type data = { isDebug: boolean, canvas: HTMLCanvasElement }

let _prepareUI = (meta3dState: meta3dState, api: api) => {
	let uiState = api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol")



	let { registerSkin } = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")

	// uiState = registerSkin(uiState, api.getContribute<skinContribute<skin>>(meta3dState, meta3dSkinDefaultContributeName))
	uiState = api.getAllContributesByType<skinContribute<any>>(meta3dState, contributeType.Skin).reduce<uiState>((uiState, contribute) => {
		return registerSkin(uiState, contribute)
	}, uiState)


	meta3dState = api.setExtensionState(meta3dState, "meta3d-ui-protocol", uiState)


	return Promise.resolve(meta3dState)
}

export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
	return {
		init: (meta3dState: meta3dState, { isDebug, canvas }) => {
			// return _prepareUI(meta3dState, api).then(meta3dState => {
			// 	let { init } = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")

			// 	return init(meta3dState, [api, "meta3d-imgui-renderer-protocol"], false, isDebug, canvas).then(meta3dState => {
			// 		return prepareUIControls(meta3dState, api)
			// 	})
			// })
			return _prepareUI(meta3dState, api).then(meta3dState => {
				let uiService = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")

				return uiService.init(meta3dState, [api, "meta3d-imgui-renderer-protocol"], true, isDebug, canvas).then(meta3dState => {
					let runEngineService = api.getExtensionService<runEngineService>(
						meta3dState,
						"meta3d-editor-run-engine-sceneview-protocol"
					)
					let runEngineGameViewService = api.getExtensionService<runEngineGameViewService>(
						meta3dState,
						"meta3d-editor-run-engine-gameview-protocol"
					)

					return runEngineService.prepareForVisual(meta3dState,
						uiService.getContext(meta3dState),
						canvas,
						isDebug
					).then(meta3dState => {
						return runEngineGameViewService.prepareForVisual(meta3dState,
							uiService.getContext(meta3dState),
							canvas,
							isDebug
						)
					})
				}).then(meta3dState => {
					return prepareUIControls(meta3dState, api)
				})
			})
		},
		update: (meta3dState: meta3dState, { clearColor, time, skinName }) => {
			let { getSkin, render, clear, setStyle } = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")

			let uiState = api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol")


			if (!isNullable(skinName)) {
				let skin = getSkin<skin>(uiState, getExn(skinName))
				if (!isNullable(skin)) {
					meta3dState = setStyle(meta3dState, getExn(skin).skin.style)
				}
			}


			meta3dState = clear(meta3dState, [api, "meta3d-imgui-renderer-protocol"], clearColor)

			return render(meta3dState, ["meta3d-ui-protocol", "meta3d-imgui-renderer-protocol"], time)
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
