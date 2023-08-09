import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { state } from "meta3d-editor-engine-whole-protocol/src/state/StateType"
import { service } from "meta3d-editor-engine-whole-protocol/src/service/ServiceType"
import { service as engineBasicService } from "meta3d-engine-basic-protocol/src/service/ServiceType"
// import { state as engineBasicState } from "meta3d-engine-basic-protocol/src/state/StateType"
import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
// import { state as engineSceneState } from "meta3d-engine-scene-protocol/src/state/StateType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { service as engineRenderService } from "meta3d-editor-engine-render-protocol/src/service/ServiceType"
import { getExtensionService as getEngineWholeExtensionService } from "meta3d-engine-whole-utils/src/implement/Main"
import { pipelineContribute } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { config as sceneView1Config } from "meta3d-pipeline-editor-webgl1-scene-view1-protocol/src/ConfigType";
import { state as sceneView1State, states as sceneView1States } from "meta3d-pipeline-editor-webgl1-scene-view1-protocol/src/StateType";
import { config as sceneView2Config } from "meta3d-pipeline-editor-webgl1-scene-view2-protocol/src/ConfigType";
import { state as sceneView2State, states as sceneView2States } from "meta3d-pipeline-editor-webgl1-scene-view2-protocol/src/StateType";
import { state as eventState, states as eventStates } from "meta3d-pipeline-editor-event-protocol/src/StateType"
import { config as eventConfig } from "meta3d-pipeline-editor-event-protocol/src/ConfigType"


let _registerEditorPipelines = (
	meta3dState: meta3dState, api: api,
	[meta3dPipelineEditorWebgl1SceneView1ContributeName, meta3dPipelineEditorWebgl1SceneView2ContributeName, meta3dPipelineEditorEventContributeName]: [string, string, string],
	canvas: HTMLCanvasElement
) => {
	let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, "meta3d-engine-core-protocol")

	let engineCoreService = api.getExtensionService<engineCoreService>(
		meta3dState,
		"meta3d-engine-core-protocol"
	)



	let { registerPipeline } = engineCoreService

	engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<sceneView1Config, sceneView1State>>(meta3dState, meta3dPipelineEditorWebgl1SceneView1ContributeName),
		{ canvas },
		[
			{
				pipelineName: "init",
				// insertElementName: "prepare_init_data_webgl1_engine",
				// insertAction: "before"
				insertElementName: "init_root_meta3d",
				insertAction: "after"
			},
			// {
			// 	pipelineName: "update",
			// 	insertElementName: "update_root_meta3d",
			// 	insertAction: "after"
			// },
			{
				pipelineName: "update",
				insertElementName: "update_camera_camera_meta3d",
				insertAction: "before"
			},
			{
				pipelineName: "render",
				insertElementName: "render_three_meta3d",
				insertAction: "before"
			},
		]
	)
	engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<sceneView2Config, sceneView2State>>(meta3dState, meta3dPipelineEditorWebgl1SceneView2ContributeName),
		null,
		[
			{
				pipelineName: "render",
				insertElementName: "render_three_meta3d",
				insertAction: "after"
			},
		]
	)

	engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<eventConfig, eventState>>(meta3dState, meta3dPipelineEditorEventContributeName),
		null,
		[
			{
				pipelineName: "init",
				insertElementName: "scene_view1_gl_webgl1_create_default_scene_meta3d",
				insertAction: "before"
			},
		]
	)



	return api.setExtensionState(meta3dState, "meta3d-engine-core-protocol", engineCoreState)
}

export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
	return {
		...getEngineWholeExtensionService(api, [
			"meta3d-bs-most-protocol",
			"meta3d-engine-core-protocol",
			"meta3d-engine-scene-protocol",
		]),
		prepare: (meta3dState: meta3dState, isDebug, ecsConfig, gl, canvas) => {
			// let engineBasicState = api.getExtensionState<engineBasicState>(meta3dState, meta3dEngineBasicExtensionProtocolName)

			let engineBasicService = api.getExtensionService<engineBasicService>(
				meta3dState,
				"meta3d-engine-basic-protocol"
			)

			meta3dState = engineBasicService.prepare(meta3dState, isDebug)

			// let engineSceneState = api.getExtensionState<engineSceneState>(meta3dState, meta3dEngineSceneExtensionProtocolName)

			let engineSceneService = api.getExtensionService<engineSceneService>(
				meta3dState,
				"meta3d-engine-scene-protocol"
			)

			meta3dState = engineSceneService.prepare(meta3dState, isDebug, ecsConfig)


			// let engineRenderState = api.getExtensionState<engineRenderState>(meta3dState, meta3dEditorEngineRenderExtensionProtocolName)

			let engineRenderService = api.getExtensionService<engineRenderService>(
				meta3dState,
				"meta3d-editor-engine-render-protocol"
			)

			meta3dState = engineRenderService.prepare(meta3dState, isDebug, gl, canvas)


			meta3dState = _registerEditorPipelines(
				meta3dState, api,
				["meta3d-pipeline-editor-webgl1-scene-view1-protocol", "meta3d-pipeline-editor-webgl1-scene-view2-protocol", "meta3d-pipeline-editor-event-protocol"],
				canvas
			)




			return meta3dState
		},
	}
}

export let createExtensionState: createExtensionStateMeta3D<
	state
> = () => {
	return null
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
	return {
	}
}
