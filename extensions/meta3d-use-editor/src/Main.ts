import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api, canvasData } from "meta3d-type"
import { contributeType } from "meta3d-type/src/contribute/ContributeType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { configData, service } from "meta3d-use-editor-protocol/src/service/ServiceType"
import { state } from "meta3d-use-editor-protocol/src/state/StateType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
// import { service as bindIOEventService } from "meta3d-bind-io-event-protocol/src/service/ServiceType"
import { state as eventState } from "meta3d-event-protocol/src/state/StateType"
// import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
// import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { skinContribute } from "meta3d-ui-protocol/src/contribute/SkinContributeType"
import { uiControlContribute } from "meta3d-ui-protocol/src/contribute/UIControlContributeType"
import { elementContribute } from "meta3d-ui-protocol/src/contribute/ElementContributeType"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { skin } from "meta3d-skin-protocol"
import { isNullable, getExn } from "meta3d-commonlib-ts/src/NullableUtils"
// import { pipelineContribute } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
// import { config as sceneView1Config } from "meta3d-pipeline-editor-webgl1-scene-view1-protocol/src/ConfigType";
// import { state as sceneView1State, states as sceneView1States } from "meta3d-pipeline-editor-webgl1-scene-view1-protocol/src/StateType";
// import { config as sceneView2Config } from "meta3d-pipeline-editor-webgl1-scene-view2-protocol/src/ConfigType";
// import { state as sceneView2State, states as sceneView2States } from "meta3d-pipeline-editor-webgl1-scene-view2-protocol/src/StateType";
import { service as runEngineService } from "meta3d-editor-run-engine-protocol/src/service/ServiceType"
import { service as runEngineGameViewService } from "meta3d-editor-run-engine-gameview-protocol/src/service/ServiceType"

let _prepareUI = (meta3dState: meta3dState, api: api) => {
	let { registerElement } = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")

	let uiState = api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol")





	let { registerSkin, registerUIControl } = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")

	uiState = api.getAllContributesByType<skinContribute<any>>(meta3dState, contributeType.Skin).reduce<uiState>((uiState, contribute) => {
		return registerSkin(uiState, contribute)
	}, uiState)


	uiState = api.getAllContributesByType<uiControlContribute<any, any>>(meta3dState, contributeType.UIControl).reduce<uiState>((uiState, contribute) => {
		return registerUIControl(uiState, contribute)
	}, uiState)








	uiState = api.getAllContributesByType<elementContribute<any>>(meta3dState, contributeType.Element).reduce<uiState>((uiState, contribute) => {
		return registerElement(uiState, contribute)
	}, uiState)



	meta3dState = api.setExtensionState(meta3dState, "meta3d-ui-protocol", uiState)






	let { registerAction } = api.getExtensionService<eventService>(meta3dState, "meta3d-event-protocol")

	let eventState = api.getExtensionState<eventState>(meta3dState, "meta3d-event-protocol")


	eventState = api.getAllContributesByType<actionContribute<any, any>>(meta3dState, contributeType.Action).reduce<eventState>((eventState, contribute) => {
		return registerAction(eventState, contribute)
	}, eventState)


	meta3dState = api.setExtensionState(meta3dState, "meta3d-event-protocol", eventState)

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

let _init = (meta3dState: meta3dState, api: api, [canvasData, { isDebug }]: configData) => {
	meta3dState = _prepareUI(meta3dState, api)


	// meta3dState = _registerEditorPipelines(
	// 	meta3dState, api,
	// 	meta3dEngineCoreExtensionProtocolName,
	// 	[meta3dPipelineEditorWebgl1SceneView1ContributeName, meta3dPipelineEditorWebgl1SceneView2ContributeName]
	// )




	let canvas = _createAndInsertCanvas(canvasData)

	let uiService = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")

	return uiService.init(meta3dState, [api, "meta3d-imgui-renderer-protocol"], true, isDebug, canvas).then(meta3dState => {
		let runEngineService = api.getExtensionService<runEngineService>(
			meta3dState,
			"meta3d-editor-run-engine-protocol"
		)
		let runEngineGameViewService = api.getExtensionService<runEngineGameViewService>(
			meta3dState,
			"meta3d-editor-run-engine-gameview-protocol"
		)

		return runEngineService.prepareAndInitEngine(meta3dState,
			uiService.getContext(meta3dState),
			canvas,
			isDebug
		).then(meta3dState => {
			return runEngineGameViewService.prepareAndInitEngine(meta3dState,
				uiService.getContext(meta3dState),
				canvas,
				isDebug
			)
		})
	})
}

let _loop = (
	api: api, meta3dState: meta3dState,
	time: number,
	configData: configData
) => {
	console.log("loop")

	let [_, { skinName, clearColor }] = configData

	let { getSkin, render, clear, setStyle } = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")

	let uiState = api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol")

	if (!isNullable(skinName)) {
		let skin = getSkin<skin>(uiState, skinName)
		if (!isNullable(skin)) {
			meta3dState = setStyle(meta3dState, getExn(skin).skin.style)
		}
	}


	meta3dState = clear(meta3dState, [api, "meta3d-imgui-renderer-protocol"], clearColor)

	// render(meta3dState, ["meta3d-ui-protocol", "meta3d-imgui-renderer-protocol"], getIOData()).then((meta3dState: meta3dState) => {
	render(meta3dState, ["meta3d-ui-protocol", "meta3d-imgui-renderer-protocol"], time).then((meta3dState: meta3dState) => {
		// resetIOData()
		let runEngineService = api.getExtensionService<runEngineService>(
			meta3dState,
			"meta3d-editor-run-engine-protocol"
		)

		runEngineService.loopEngine(meta3dState).then(meta3dState => {
			requestAnimationFrame(
				(time) => {
					_loop(api, meta3dState,
						time,
						configData)
				}
			)
		})
	})
}

export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
	return {
		run: (meta3dState: meta3dState, configData) => {
			_init(meta3dState, api, configData).then((meta3dState: meta3dState) => {
				_loop(api, meta3dState,
					0,
					configData)
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


