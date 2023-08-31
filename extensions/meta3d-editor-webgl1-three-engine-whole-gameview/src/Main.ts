import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { state } from "meta3d-engine-whole-gameview-protocol/src/state/StateType"
import { service } from "meta3d-engine-whole-gameview-protocol/src/service/ServiceType"
import { buildNewEngineWholeExtensionService, prepare } from "meta3d-editor-webgl1-three-engine-whole-utils/src/Main"



// let _registerEditorPipelines = (
// 	meta3dState: meta3dState, api: api,
// 	[meta3dPipelineEditorWebgl1SceneView1ContributeName, meta3dPipelineEditorWebgl1SceneView2ContributeName, meta3dPipelineEditorEventContributeName]: [string, string, string],
// 	canvas: HTMLCanvasElement
// ) => {
// 	let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, "meta3d-engine-core-protocol")

// 	let engineCoreService = api.getExtensionService<engineCoreService>(
// 		meta3dState,
// 		"meta3d-engine-core-protocol"
// 	)



// 	let { registerPipeline } = engineCoreService

// 	engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<sceneView1Config, sceneView1State>>(meta3dState, meta3dPipelineEditorWebgl1SceneView1ContributeName),
// 		{ canvas },
// 		[
// 			{
// 				pipelineName: pipelineRootPipeline.Init,
// 				insertElementName: pipelineRootJob.Init,
// 				insertAction: "after"
// 			},
// 			{
// 				pipelineName: pipelineCameraPipeline.Update,
// 				insertElementName: pipelineCameraJob.UpdateCamera,
// 				insertAction: "before"
// 			},
// 			{
// 				pipelineName: pipelineThreePipeline.Render,
// 				insertElementName: pipelineThreeJob.Render,
// 				insertAction: "before"
// 			},
// 		]
// 	)
// 	engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<sceneView2Config, sceneView2State>>(meta3dState, meta3dPipelineEditorWebgl1SceneView2ContributeName),
// 		null,
// 		[
// 			{
// 				pipelineName: pipelineThreePipeline.Render,
// 				insertElementName: pipelineThreeJob.Render,
// 				insertAction: "after"
// 			},
// 		]
// 	)

// 	engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<editorEventConfig, editorEventState>>(meta3dState, meta3dPipelineEditorEventContributeName),
// 		null,
// 		[
// 			{
// 				pipelineName: pipelineSceneView1Pipeline.Init,
// 				insertElementName: pipelineSceneView1Job.CreateDefaultScene,
// 				insertAction: "before"
// 			},
// 		]
// 	)



// 	return api.setExtensionState(meta3dState, "meta3d-engine-core-protocol", engineCoreState)
// }

export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
	let newEngineWholeExtensionService = buildNewEngineWholeExtensionService(api,
		{
			engineSceneProtocolName: "meta3d-engine-scene-gameview-protocol",
			engineCoreProtocolName: "meta3d-engine-core-gameview-protocol",
			scenegraphConverterProtocolName: "meta3d-scenegraph-converter-three-gameview-protocol"
		}
	)

	return {
		...newEngineWholeExtensionService,
		prepare: (meta3dState: meta3dState, isDebug, ecsConfig, gl, canvas) => {
			meta3dState = prepare(
				meta3dState, api,
				{
					engineBasicProtocolName: "meta3d-engine-basic-gameview-protocol",
					engineSceneProtocolName: "meta3d-engine-scene-gameview-protocol",
					editorEngineRenderProtocolName: "meta3d-editor-engine-render-gameview-protocol",
				},
				isDebug, ecsConfig, gl, canvas
			)

			TODO finish
			meta3dState = _registerEditorPipelines(
				meta3dState, api,
				[TODO],
				canvas
			)

			return meta3dState

		},
		loadScene: (meta3dState, sceneGLB) => {
			throw new Error("not implement")
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
