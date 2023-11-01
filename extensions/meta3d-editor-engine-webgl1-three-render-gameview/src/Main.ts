import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState } from "meta3d-type"
import { state } from "meta3d-editor-engine-render-gameview-protocol/src/state/StateType"
import { service } from "meta3d-editor-engine-render-gameview-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-gameview-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-gameview-protocol/src/state/StateType"
import { pipelineContribute } from "meta3d-engine-core-gameview-protocol/src/contribute/work/PipelineContributeType"
import { config as view1Config } from "meta3d-pipeline-editor-webgl1-view1-three-gameview-protocol/src/ConfigType";
import { state as view1State,
pipeline as pipelineView1Pipeline, job as pipelineView1Job 
} from "meta3d-pipeline-editor-webgl1-view1-three-gameview-protocol/src/StateType";
import {job as pipelineThreeJob, state as threeState, states as threeStates } from "meta3d-pipeline-webgl1-three-gameview-protocol/src/StateType";
import { config as threeConfig } from "meta3d-pipeline-webgl1-three-gameview-protocol/src/ConfigType";
import { state as viewRectState, states as viewRectStates } from "meta3d-pipeline-viewrect-gameview-protocol/src/StateType";
import { config as viewRectConfig } from "meta3d-pipeline-viewrect-gameview-protocol/src/ConfigType";
import { state as disposeState, states as disposeStates } from "meta3d-pipeline-dispose-gameview-protocol/src/StateType";
import { config as disposeConfig } from "meta3d-pipeline-dispose-gameview-protocol/src/ConfigType";
import { pipeline as pipelineRootPipeline, job as pipelineRootJob } from "meta3d-pipeline-root-gameview-protocol/src/StateType"
import { pipeline as pipelineCameraPipeline, job as pipelineCameraJob } from "meta3d-pipeline-camera-gameview-protocol/src/StateType"
// import { pipeline as pipelineGameView1Pipeline, job as pipelineGameView1Job } from "meta3d-pipeline-editor-webgl1-game-view1-protocol/src/StateType"

export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
	return {
		prepare: (meta3dState: meta3dState, isDebug, gl, canvas) => {
			let engineCoreProtocolName = "meta3d-engine-core-gameview-protocol"

			let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, engineCoreProtocolName)

			let engineCoreService = api.getExtensionService<engineCoreService>(
				meta3dState,
				engineCoreProtocolName
			)


			let { registerPipeline } = engineCoreService

			engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<threeConfig, threeState>>(meta3dState, "meta3d-pipeline-webgl1-three-gameview-protocol"),
				{
					canvas
				},
				[
					{
						pipelineName: pipelineRootPipeline.Init,
						insertElementName: pipelineRootJob.Init,
						insertAction: "after"
					},
					{
						pipelineName: pipelineRootPipeline.Update,
						insertElementName: pipelineRootJob.Update,
						insertAction: "after"
					},
					{
						pipelineName: pipelineRootPipeline.Render,
						insertElementName: pipelineRootJob.Render,
						insertAction: "after"
					}
				]
			)

			engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<viewRectConfig, viewRectState>>(meta3dState, "meta3d-pipeline-viewrect-gameview-protocol"),
				{
					canvas
				},
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
					}
				]
			)

			engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<disposeConfig, disposeState>>(meta3dState, "meta3d-pipeline-dispose-gameview-protocol"),
				null,
				[
					{
						pipelineName: pipelineRootPipeline.Update,
						insertElementName: pipelineRootJob.Update,
						insertAction: "after"
					}
				]
			)


			engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<view1Config, view1State>>(meta3dState, "meta3d-pipeline-editor-webgl1-view1-three-gameview-protocol"),
				null,
				[
					{
						pipelineName: pipelineView1Pipeline.Render,
						insertElementName: pipelineThreeJob.Render,
						insertAction: "after"
					}
				]
			)




			meta3dState =
				api.setExtensionState(
					meta3dState,
					engineCoreProtocolName,
					engineCoreState
				)

			return meta3dState
		}
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
