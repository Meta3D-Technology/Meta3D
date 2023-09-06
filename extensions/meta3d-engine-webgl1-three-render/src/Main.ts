import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState } from "meta3d-type"
import { state } from "meta3d-engine-render-protocol/src/state/StateType"
import { service } from "meta3d-engine-render-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { pipelineContribute } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { state as threeState, states as threeStates } from "meta3d-pipeline-webgl1-three-protocol/src/StateType";
import { config as threeConfig } from "meta3d-pipeline-webgl1-three-protocol/src/ConfigType";
import { state as viewRectState, states as viewRectStates } from "meta3d-pipeline-viewrect-protocol/src/StateType";
import { config as viewRectConfig } from "meta3d-pipeline-viewrect-protocol/src/ConfigType";
import { state as disposeState, states as disposeStates } from "meta3d-pipeline-dispose-protocol/src/StateType";
import { config as disposeConfig } from "meta3d-pipeline-dispose-protocol/src/ConfigType";
import { pipeline as pipelineRootPipeline, job as pipelineRootJob } from "meta3d-pipeline-root-protocol/src/StateType"
import { pipeline as pipelineCameraPipeline, job as pipelineCameraJob } from "meta3d-pipeline-camera-protocol/src/StateType"

export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
	return {
		prepare: (meta3dState: meta3dState, isDebug,  canvas) => {
			let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, "meta3d-engine-core-protocol")

			let engineCoreService = api.getExtensionService<engineCoreService>(
				meta3dState,
				"meta3d-engine-core-protocol"
			)


			let { registerPipeline } = engineCoreService

			engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<threeConfig, threeState>>(meta3dState, "meta3d-pipeline-webgl1-three-protocol"),
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

			engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<viewRectConfig, viewRectState>>(meta3dState, "meta3d-pipeline-viewrect-protocol"),
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

			engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<disposeConfig, disposeState>>(meta3dState, "meta3d-pipeline-dispose-protocol"),
				null,
				[
					{
						pipelineName: pipelineRootPipeline.Update,
						insertElementName: pipelineRootJob.Update,
						insertAction: "after"
					}
				]
			)

			// engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<sceneView1Config, sceneView1State>>(meta3dState, "meta3d-pipeline-editor-webgl1-view1-three-protocol"),
			// 	null,
			// 	[
			// 		{
			// 			pipelineName: pipelineSceneView1Pipeline.Render,
			// 			insertElementName: pipelineSceneView1Job.UseFBO,
			// 			insertAction: "before"
			// 		}
			// 	]
			// )





			meta3dState =
				api.setExtensionState(
					meta3dState,
					"meta3d-engine-core-protocol",
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
