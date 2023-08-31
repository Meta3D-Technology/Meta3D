import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { state } from "meta3d-engine-whole-protocol/src/state/StateType"
import { service } from "meta3d-engine-whole-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { pipelineContribute } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { config as sceneView1Config } from "meta3d-pipeline-editor-webgl1-scene-view1-protocol/src/ConfigType";
import { state as sceneView1State, states as sceneView1States } from "meta3d-pipeline-editor-webgl1-scene-view1-protocol/src/StateType";
import { config as sceneView2Config } from "meta3d-pipeline-editor-webgl1-scene-view2-protocol/src/ConfigType";
import { state as sceneView2State, states as sceneView2States } from "meta3d-pipeline-editor-webgl1-scene-view2-protocol/src/StateType";
import { state as editorEventState } from "meta3d-pipeline-editor-event-protocol/src/StateType"
import { config as editorEventConfig } from "meta3d-pipeline-editor-event-protocol/src/ConfigType"
import { pipeline as pipelineRootPipeline, job as pipelineRootJob } from "meta3d-pipeline-root-protocol/src/StateType"
import { pipeline as pipelineCameraPipeline, job as pipelineCameraJob } from "meta3d-pipeline-camera-protocol/src/StateType"
import { pipeline as pipelineThreePipeline, job as pipelineThreeJob } from "meta3d-pipeline-webgl1-three-protocol/src/StateType"
import { pipeline as pipelineSceneView1Pipeline, job as pipelineSceneView1Job } from "meta3d-pipeline-editor-webgl1-scene-view1-protocol/src/StateType"
import { buildNewEngineWholeExtensionService, prepare } from "meta3d-editor-webgl1-three-engine-whole-utils/src/Main"



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
				pipelineName: pipelineRootPipeline.Init,
				insertElementName: pipelineRootJob.Init,
				insertAction: "after"
			},
			{
				pipelineName: pipelineCameraPipeline.Update,
				insertElementName: pipelineCameraJob.UpdateCamera,
				insertAction: "before"
			},
			{
				pipelineName: pipelineThreePipeline.Render,
				insertElementName: pipelineThreeJob.Render,
				insertAction: "before"
			},
		]
	)
	engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<sceneView2Config, sceneView2State>>(meta3dState, meta3dPipelineEditorWebgl1SceneView2ContributeName),
		null,
		[
			{
				pipelineName: pipelineThreePipeline.Render,
				insertElementName: pipelineThreeJob.Render,
				insertAction: "after"
			},
		]
	)

	engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<editorEventConfig, editorEventState>>(meta3dState, meta3dPipelineEditorEventContributeName),
		null,
		[
			{
				pipelineName: pipelineSceneView1Pipeline.Init,
				insertElementName: pipelineSceneView1Job.CreateDefaultScene,
				insertAction: "before"
			},
		]
	)



	return api.setExtensionState(meta3dState, "meta3d-engine-core-protocol", engineCoreState)
}

export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
	let newEngineWholeExtensionService = buildNewEngineWholeExtensionService(api,
		{
			engineSceneProtocolName: "meta3d-engine-scene-protocol",
			engineCoreProtocolName: "meta3d-engine-core-protocol",
			scenegraphConverterProtocolName: "meta3d-scenegraph-converter-three-protocol"
		}
	)

	return {
		...newEngineWholeExtensionService,
		prepare: (meta3dState: meta3dState, isDebug, ecsConfig, gl, canvas) => {
			meta3dState = prepare(
				meta3dState, api,
				{
					engineBasicProtocolName: "meta3d-engine-basic-protocol",
					engineSceneProtocolName: "meta3d-engine-scene-protocol",
					editorEngineRenderProtocolName: "meta3d-editor-engine-render-protocol",
				},
				isDebug, ecsConfig, gl, canvas
			)

			meta3dState = _registerEditorPipelines(
				meta3dState, api,
				["meta3d-pipeline-editor-webgl1-scene-view1-protocol", "meta3d-pipeline-editor-webgl1-scene-view2-protocol", "meta3d-pipeline-editor-event-protocol"],
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
