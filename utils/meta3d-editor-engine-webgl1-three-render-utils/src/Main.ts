import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { pipelineContribute } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { state as threeState, states as threeStates } from "meta3d-pipeline-webgl1-three-protocol/src/StateType";
import { config as threeConfig } from "meta3d-pipeline-webgl1-three-protocol/src/ConfigType";
import { state as viewRectState, states as viewRectStates } from "meta3d-pipeline-viewrect-protocol/src/StateType";
import { config as viewRectConfig } from "meta3d-pipeline-viewrect-protocol/src/ConfigType";
import { state as disposeState, states as disposeStates } from "meta3d-pipeline-dispose-protocol/src/StateType";
import { config as disposeConfig } from "meta3d-pipeline-dispose-protocol/src/ConfigType";
// import { config as sceneView1Config } from "meta3d-pipeline-editor-webgl1-scene-view1-three-protocol/src/ConfigType";
// import { state as sceneView1State, states as sceneView1States } from "meta3d-pipeline-editor-webgl1-scene-view1-three-protocol/src/StateType";
import { pipeline as pipelineRootPipeline, job as pipelineRootJob } from "meta3d-pipeline-root-protocol/src/StateType"
import { pipeline as pipelineCameraPipeline, job as pipelineCameraJob } from "meta3d-pipeline-camera-protocol/src/StateType"
// import { pipeline as pipelineSceneView1Pipeline, job as pipelineSceneView1Job } from "meta3d-pipeline-editor-webgl1-scene-view1-protocol/src/StateType"

export let prepare = (meta3dState: meta3dState, api:api, isDebug: boolean, gl: WebGLRenderingContext, canvas: HTMLCanvasElement, engineCoreProtocolName: string) => {
	let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, engineCoreProtocolName)

	let engineCoreService = api.getExtensionService<engineCoreService>(
		meta3dState,
		engineCoreProtocolName
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

	// engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<sceneView1Config, sceneView1State>>(meta3dState, "meta3d-pipeline-editor-webgl1-scene-view1-three-protocol"),
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
			engineCoreProtocolName,
			engineCoreState
		)

	return meta3dState
}