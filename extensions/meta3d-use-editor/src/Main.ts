import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api, canvasData } from "meta3d-type"
import { contributeType } from "meta3d-type/src/contribute/ContributeType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-use-editor-protocol/src/service/DependentMapType"
import { configData, service } from "meta3d-use-editor-protocol/src/service/ServiceType"
import { state } from "meta3d-use-editor-protocol/src/state/StateType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
// import { service as bindIOEventService } from "meta3d-bind-io-event-protocol/src/service/ServiceType"
import { state as eventState } from "meta3d-event-protocol/src/state/StateType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { skinContribute } from "meta3d-ui-protocol/src/contribute/SkinContributeType"
import { uiControlContribute } from "meta3d-ui-protocol/src/contribute/UIControlContributeType"
import { elementContribute } from "meta3d-ui-protocol/src/contribute/ElementContributeType"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { skin } from "meta3d-skin-protocol"
import { isNullable, getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { workPluginContribute } from "meta3d-engine-core-protocol/src/contribute/work/WorkPluginContributeType"
import { config as sceneView1Config } from "meta3d-work-plugin-editor-webgl1-scene-view1-protocol/src/ConfigType";
import { state as sceneView1State, states as sceneView1States } from "meta3d-work-plugin-editor-webgl1-scene-view1-protocol/src/StateType";
import { config as sceneView2Config } from "meta3d-work-plugin-editor-webgl1-scene-view2-protocol/src/ConfigType";
import { state as sceneView2State, states as sceneView2States } from "meta3d-work-plugin-editor-webgl1-scene-view2-protocol/src/StateType";
import { service as engineWholeService } from "meta3d-editor-engine-whole-protocol/src/service/ServiceType"

let _prepareUI = (meta3dState: meta3dState, api: api, [dependentExtensionNameMap, _]: [dependentExtensionNameMap, dependentContributeNameMap]) => {
	let { meta3dEventExtensionName, meta3dUIExtensionName } = dependentExtensionNameMap


	let { registerElement } = api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionName)

	let uiState = api.getExtensionState<uiState>(meta3dState, meta3dUIExtensionName)





	let { registerSkin, registerUIControl } = api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionName)

	uiState = api.getAllContributesByType<skinContribute<any>>(meta3dState, contributeType.Skin).reduce<uiState>((uiState, contribute) => {
		return registerSkin(uiState, contribute)
	}, uiState)


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

let _registerEditorWorkPlugins = (
	meta3dState: meta3dState, api: api,
	meta3dEngineCoreExtensionName: string,
	[meta3dWorkPluginEditorWebgl1SceneView1ContributeName, meta3dWorkPluginEditorWebgl1SceneView2ContributeName]: [string, string]
) => {
	let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, meta3dEngineCoreExtensionName)

	let engineCoreService = api.getExtensionService<engineCoreService>(
		meta3dState,
		meta3dEngineCoreExtensionName
	)



	let { registerWorkPlugin } = engineCoreService

	engineCoreState = registerWorkPlugin(engineCoreState, api.getContribute<workPluginContribute<sceneView1Config, sceneView1State>>(meta3dState, meta3dWorkPluginEditorWebgl1SceneView1ContributeName),
		null,
		[
			{
				pipelineName: "init",
				insertElementName: "prepare_init_data_webgl1_engine",
				insertAction: "after"
			},
			{
				pipelineName: "update",
				insertElementName: "update_root_meta3d",
				insertAction: "after"
			},
			{
				pipelineName: "render",
				insertElementName: "render_webgl1_render_meta3d",
				insertAction: "before"
			},
		]
	)
	engineCoreState = registerWorkPlugin(engineCoreState, api.getContribute<workPluginContribute<sceneView2Config, sceneView2State>>(meta3dState, meta3dWorkPluginEditorWebgl1SceneView2ContributeName),
		null,
		[
			{
				pipelineName: "render",
				insertElementName: "render_webgl1_render_meta3d",
				insertAction: "after"
			},
		]
	)

	return api.setExtensionState(meta3dState, meta3dEngineCoreExtensionName, engineCoreState)
}

let _prepareAndInitEngine = (
	meta3dState: meta3dState, api: api,
	uiService: uiService,
	meta3dEditorEngineWholeExtensionName: string,
	isDebug: boolean
) => {
	let engineWholeService = api.getExtensionService<engineWholeService>(
		meta3dState,
		meta3dEditorEngineWholeExtensionName
	)

	meta3dState = engineWholeService.prepare(meta3dState, isDebug,
		{
			float9Array1: new Float32Array(),
			float32Array1: new Float32Array(),
			transformCount: 100,
			geometryCount: 100,
			geometryPointCount: 1000,
			pbrMaterialCount: 100
		},
		uiService.getContext(meta3dState)
	)



	return engineWholeService.init(meta3dState)

}

let _init = (meta3dState: meta3dState, api: api, dependentMapData: [dependentExtensionNameMap, dependentContributeNameMap], [canvasData, { isDebug }]: configData) => {
	let [dependentExtensionNameMap, dependentContributeNameMap] = dependentMapData
	let { meta3dUIExtensionName, meta3dImguiRendererExtensionName, meta3dEngineCoreExtensionName, meta3dEditorEngineWholeExtensionName } = dependentExtensionNameMap
	let {
		meta3dWorkPluginEditorWebgl1SceneView1ContributeName,
		meta3dWorkPluginEditorWebgl1SceneView2ContributeName
	} = dependentContributeNameMap

	meta3dState = _prepareUI(meta3dState, api, dependentMapData)


	meta3dState = _registerEditorWorkPlugins(
		meta3dState, api,
		meta3dEngineCoreExtensionName,
		[meta3dWorkPluginEditorWebgl1SceneView1ContributeName, meta3dWorkPluginEditorWebgl1SceneView2ContributeName]
	)




	let canvas = _createAndInsertCanvas(canvasData)

	let uiService = api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionName)

	return uiService.init(meta3dState, [api, meta3dImguiRendererExtensionName], true, isDebug, canvas).then(meta3dState => {
		return _prepareAndInitEngine(
			meta3dState, api,
			uiService,
			meta3dEditorEngineWholeExtensionName,
			isDebug
		)
	})



	// let { initEvent, setBody, setBrowser, setCanvas, getBrowserChromeType } = api.getExtensionService<eventService>(meta3dState, meta3dEventExtensionName)

	// meta3dState = setBody(meta3dState, meta3dEventExtensionName, document.body as HTMLBodyElement)
	// meta3dState = setBrowser(meta3dState, meta3dEventExtensionName, getBrowserChromeType())
	// meta3dState = setCanvas(meta3dState, meta3dEventExtensionName, canvas)

	// meta3dState = initEvent(meta3dState, meta3dEventExtensionName)




	// let { bindIOEvent } = api.getExtensionService<bindIOEventService>(meta3dState, meta3dBindIOEventExtensionName)

	// bindIOEvent(meta3dState)



	// return meta3dState
}

let _loopEngine = (
	meta3dState: meta3dState,
	api: api,
	meta3dEditorEngineWholeExtensionName: string
) => {
	let engineWholeService = api.getExtensionService<engineWholeService>(
		meta3dState,
		meta3dEditorEngineWholeExtensionName
	)

	return engineWholeService.update(meta3dState).then(meta3dState => engineWholeService.render(meta3dState))
}

let _loop = (
	api: api, meta3dState: meta3dState,
	time: number,
	[meta3dEditorEngineWholeExtensionName, meta3dUIExtensionName, meta3dImguiRendererExtensionName]: [string, string, string],
	configData: configData
) => {
	let [_, { skinName, clearColor }] = configData

	let { getSkin, render, clear, setStyle } = api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionName)

	let uiState = api.getExtensionState<uiState>(meta3dState, meta3dUIExtensionName)

	if (!isNullable(skinName)) {
		let skin = getSkin<skin>(uiState, skinName)
		if (!isNullable(skin)) {
			meta3dState = setStyle(meta3dState, getExn(skin).skin.style)
		}
	}


	meta3dState = clear(meta3dState, [api, meta3dImguiRendererExtensionName], clearColor)

	// render(meta3dState, [meta3dUIExtensionName, meta3dImguiRendererExtensionName], getIOData()).then((meta3dState: meta3dState) => {
	render(meta3dState, [meta3dUIExtensionName, meta3dImguiRendererExtensionName], time).then((meta3dState: meta3dState) => {
		// resetIOData()

		_loopEngine(meta3dState, api, meta3dEditorEngineWholeExtensionName).then(meta3dState => {
			requestAnimationFrame(
				(time) => {
					_loop(api, meta3dState,
						time,
						[meta3dEditorEngineWholeExtensionName, meta3dUIExtensionName, meta3dImguiRendererExtensionName], configData)
				}
			)
		})
	})
}

export let getExtensionService: getExtensionServiceMeta3D<
	dependentExtensionNameMap,
	dependentContributeNameMap,
	service
> = (api, [dependentExtensionNameMap, dependentContributeNameMap]) => {
	let { meta3dUIExtensionName, meta3dImguiRendererExtensionName, meta3dEditorEngineWholeExtensionName } = dependentExtensionNameMap

	return {
		run: (meta3dState: meta3dState, configData) => {
			_init(meta3dState, api, [dependentExtensionNameMap, dependentContributeNameMap], configData).then((meta3dState: meta3dState) => {
				_loop(api, meta3dState,
					0,
					[meta3dEditorEngineWholeExtensionName, meta3dUIExtensionName, meta3dImguiRendererExtensionName], configData)
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
