import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { state } from "meta3d-engine-whole-gameview-protocol/src/state/StateType"
import { service } from "meta3d-engine-whole-gameview-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-gameview-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-gameview-protocol/src/state/StateType"
import { pipelineContribute } from "meta3d-engine-core-gameview-protocol/src/contribute/work/PipelineContributeType"
import { config as gameView1Config } from "meta3d-pipeline-editor-webgl1-game-view1-protocol/src/ConfigType";
import { state as gameView1State, states as gameView1States } from "meta3d-pipeline-editor-webgl1-game-view1-protocol/src/StateType";
import { config as gameView2Config } from "meta3d-pipeline-editor-webgl1-game-view2-protocol/src/ConfigType";
import { state as gameView2State, states as gameView2States } from "meta3d-pipeline-editor-webgl1-game-view2-protocol/src/StateType";
import { state as editorEventState } from "meta3d-pipeline-editor-event-gameview-protocol/src/StateType"
import { config as editorEventConfig } from "meta3d-pipeline-editor-event-gameview-protocol/src/ConfigType"
import { pipeline as pipelineRootPipeline, job as pipelineRootJob } from "meta3d-pipeline-root-gameview-protocol/src/StateType"
import { pipeline as pipelineCameraPipeline, job as pipelineCameraJob } from "meta3d-pipeline-camera-gameview-protocol/src/StateType"
import { pipeline as pipelineThreePipeline, job as pipelineThreeJob } from "meta3d-pipeline-webgl1-three-gameview-protocol/src/StateType"
import { pipeline as pipelineGameView1Pipeline, job as pipelineGameView1Job } from "meta3d-pipeline-editor-webgl1-game-view1-protocol/src/StateType"
import { buildNewEngineWholeExtensionService, prepare } from "meta3d-editor-webgl1-three-engine-whole-utils/src/Main"


let _registerEditorPipelines = (
	meta3dState: meta3dState, api: api,
	[meta3dPipelineEditorWebgl1GameView1ContributeName, meta3dPipelineEditorWebgl1GameView2ContributeName, meta3dPipelineEditorEventContributeName]: [string, string, string],
	canvas: HTMLCanvasElement
) => {
	let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, "meta3d-engine-core-gameview-protocol")

	let engineCoreService = api.getExtensionService<engineCoreService>(
		meta3dState,
		"meta3d-engine-core-gameview-protocol"
	)



	let { registerPipeline } = engineCoreService

	engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<gameView1Config, gameView1State>>(meta3dState, meta3dPipelineEditorWebgl1GameView1ContributeName),
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
	engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<gameView2Config, gameView2State>>(meta3dState, meta3dPipelineEditorWebgl1GameView2ContributeName),
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
				pipelineName: pipelineGameView1Pipeline.Init,
				insertElementName: pipelineGameView1Job.CreateDefaultScene,
				insertAction: "before"
			},
		]
	)



	return api.setExtensionState(meta3dState, "meta3d-engine-core-gameview-protocol", engineCoreState)
}

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

			meta3dState = _registerEditorPipelines(
				meta3dState, api,
				["meta3d-pipeline-editor-webgl1-game-view1-protocol", "meta3d-pipeline-editor-webgl1-game-view2-protocol", "meta3d-pipeline-editor-event-gameview-protocol"],
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
