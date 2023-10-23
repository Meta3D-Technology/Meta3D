import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api, canvasData } from "meta3d-type"
import { contributeType } from "meta3d-type/src/contribute/ContributeType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { configData, service } from "meta3d-use-editor-protocol/src/service/ServiceType"
import { state } from "meta3d-use-editor-protocol/src/state/StateType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
// import { service as bindIOEventService } from "meta3d-bind-io-event-protocol/src/service/ServiceType"
import { state as eventState } from "meta3d-event-protocol/src/state/StateType"
// import { service as engineCoreService } from "meta3d-engine-core-sceneview-protocol/src/service/ServiceType"
// import { state as engineCoreState } from "meta3d-engine-core-sceneview-protocol/src/state/StateType"
import { skinContribute } from "meta3d-ui-protocol/src/contribute/SkinContributeType"
import { uiControlContribute } from "meta3d-ui-protocol/src/contribute/UIControlContributeType"
import { elementContribute } from "meta3d-ui-protocol/src/contribute/ElementContributeType"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { skin } from "meta3d-skin-protocol"
import { isNullable, getExn } from "meta3d-commonlib-ts/src/NullableUtils"
// import { pipelineContribute } from "meta3d-engine-core-sceneview-protocol/src/contribute/work/PipelineContributeType"
// import { config as sceneView1Config } from "meta3d-pipeline-editor-webgl1-scene-view1-protocol/src/ConfigType";
// import { state as sceneView1State, states as sceneView1States } from "meta3d-pipeline-editor-webgl1-scene-view1-protocol/src/StateType";
// import { config as sceneView2Config } from "meta3d-pipeline-editor-webgl1-scene-view2-protocol/src/ConfigType";
// import { state as sceneView2State, states as sceneView2States } from "meta3d-pipeline-editor-webgl1-scene-view2-protocol/src/StateType";
import { service as runEngineService } from "meta3d-editor-run-engine-sceneview-protocol/src/service/ServiceType"
import { service as runEngineGameViewService } from "meta3d-editor-run-engine-gameview-protocol/src/service/ServiceType"
import { exportEventDataForDebug, prepareActions, prepareUIControls, update } from "meta3d-run-utils/src/RunUtils"
import { service as eventDataService } from "meta3d-event-data-protocol/src/service/ServiceType"
import { service as eventSourcingService } from "meta3d-event-sourcing-protocol/src/service/ServiceType"

let _prepareUI = (meta3dState: meta3dState, api: api): Promise<meta3dState> => {
	let { registerElement } = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")

	let uiState = api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol")





	let { registerSkin, registerUIControl } = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")

	uiState = api.getAllContributesByType<skinContribute<any>>(meta3dState, contributeType.Skin).reduce<uiState>((uiState, contribute) => {
		return registerSkin(uiState, contribute)
	}, uiState)


	uiState = api.getAllContributesByType<elementContribute<any>>(meta3dState, contributeType.Element).reduce<uiState>((uiState, contribute) => {
		return registerElement(uiState, contribute)
	}, uiState)



	meta3dState = api.setExtensionState(meta3dState, "meta3d-ui-protocol", uiState)




	return prepareActions(meta3dState, api)
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
	return _prepareUI(meta3dState, api).then(meta3dState => {
		let canvas = _createAndInsertCanvas(canvasData)

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
		}).then(meta3dState => {
			return prepareUIControls(meta3dState, api)
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


	return update(meta3dState, api, { clearColor, time, skinName }).catch(e => {
		_handleError(api, meta3dState)
		throw e
	}).then(meta3dState => {
		requestAnimationFrame(
			(time) => {
				_loop(api, meta3dState,
					time,
					configData)
			}
		)
	})
}

let _handleError = (api: api, meta3dState: meta3dState) => {
	exportEventDataForDebug(
		api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-sourcing-protocol"),
		api.getExtensionService<eventDataService>(meta3dState, "meta3d-event-data-protocol"))
}

export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
	return {
		run: (meta3dState: meta3dState, configData) => {
			_init(meta3dState, api, configData).catch(e => {
				_handleError(api, meta3dState)
				throw e
			}).then((meta3dState: meta3dState) => {
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


