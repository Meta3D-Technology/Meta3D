import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { state } from "meta3d-engine-whole-sceneview-protocol/src/state/StateType"
import { service } from "meta3d-engine-whole-sceneview-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-sceneview-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-sceneview-protocol/src/state/StateType"
import { pipelineContribute } from "meta3d-engine-core-sceneview-protocol/src/contribute/work/PipelineContributeType"
import { config as sceneView1Config } from "meta3d-pipeline-editor-webgl1-scene-view1-protocol/src/ConfigType";
import { state as sceneView1State, states as sceneView1States } from "meta3d-pipeline-editor-webgl1-scene-view1-protocol/src/StateType";
import { state as editorEventState } from "meta3d-pipeline-editor-event-protocol/src/StateType"
import { config as editorEventConfig } from "meta3d-pipeline-editor-event-protocol/src/ConfigType"
import { pipeline as pipelineRootPipeline, job as pipelineRootJob } from "meta3d-pipeline-root-sceneview-protocol/src/StateType"
import { pipeline as pipelineCameraPipeline, job as pipelineCameraJob } from "meta3d-pipeline-camera-sceneview-protocol/src/StateType"
import { pipeline as pipelineThreePipeline, job as pipelineThreeJob } from "meta3d-pipeline-webgl1-three-sceneview-protocol/src/StateType"
import { pipeline as pipelineSceneView1Pipeline, job as pipelineSceneView1Job } from "meta3d-pipeline-editor-webgl1-scene-view1-protocol/src/StateType"
import { buildNewEngineWholeExtensionService, prepare } from "meta3d-editor-webgl1-three-engine-whole-utils/src/Main"
import { service as engineBasicService } from "meta3d-engine-basic-sceneview-protocol/src/service/ServiceType"
import { service as engineSceneService } from "meta3d-engine-scene-sceneview-protocol/src/service/ServiceType"
import { service as engineRenderService } from "meta3d-editor-engine-render-sceneview-protocol/src/service/ServiceType"
import { state as converterState } from "meta3d-scenegraph-converter-three-sceneview-protocol/src/state/StateType"




let _registerEditorPipelines = (
	meta3dState: meta3dState, api: api,
	[meta3dPipelineEditorWebgl1SceneView1ContributeName, meta3dPipelineEditorEventContributeName]: [string, string],
	canvas: HTMLCanvasElement
) => {
	let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, "meta3d-engine-core-sceneview-protocol")

	let engineCoreService = api.getExtensionService<engineCoreService>(
		meta3dState,
		"meta3d-engine-core-sceneview-protocol"
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
			{
				pipelineName: pipelineRootPipeline.Update,
				insertElementName: pipelineRootJob.Update,
				insertAction: "after"
			},
		]
	)



	return api.setExtensionState(meta3dState, "meta3d-engine-core-sceneview-protocol", engineCoreState)
}

export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
	let newEngineWholeExtensionService = buildNewEngineWholeExtensionService<converterState>(api,
		{
			engineSceneProtocolName: "meta3d-engine-scene-sceneview-protocol",
			engineCoreProtocolName: "meta3d-engine-core-sceneview-protocol",
			scenegraphConverterProtocolName: "meta3d-scenegraph-converter-three-sceneview-protocol"
		}
	)

	return {
		...newEngineWholeExtensionService,
		prepare: (meta3dState: meta3dState, isDebug, ecsConfig, gl, canvas) => {
			meta3dState = prepare<engineBasicService, engineSceneService, engineRenderService>(
				meta3dState, api,
				{
					engineBasicProtocolName: "meta3d-engine-basic-sceneview-protocol",
					engineSceneProtocolName: "meta3d-engine-scene-sceneview-protocol",
					editorEngineRenderProtocolName: "meta3d-editor-engine-render-sceneview-protocol",
				},
				isDebug, ecsConfig, gl, canvas
			)

			meta3dState = _registerEditorPipelines(
				meta3dState, api,
				["meta3d-pipeline-editor-webgl1-scene-view1-protocol", "meta3d-pipeline-editor-event-protocol"],
				canvas
			)

			meta3dState = api.setExtensionState<state>(meta3dState, "meta3d-engine-whole-sceneview-protocol", {
				...api.getExtensionState<state>(meta3dState, "meta3d-engine-whole-sceneview-protocol"),
				canvas: canvas
			})

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
	return {
		canvas: null
	}
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
	return {
	}
}
