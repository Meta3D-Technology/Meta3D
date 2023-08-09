import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState } from "meta3d-type"
import { state } from "meta3d-editor-engine-render-protocol/src/state/StateType"
import { service } from "meta3d-editor-engine-render-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { pipelineContribute } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { state as threeState, states as threeStates } from "meta3d-pipeline-webgl1-three-protocol/src/StateType";
import { config as threeConfig } from "meta3d-pipeline-webgl1-three-protocol/src/ConfigType";
import { state as viewRectState, states as viewRectStates } from "meta3d-pipeline-viewrect-protocol/src/StateType";
import { config as viewRectConfig } from "meta3d-pipeline-viewrect-protocol/src/ConfigType";
import { state as disposeState, states as disposeStates } from "meta3d-pipeline-dispose-protocol/src/StateType";
import { config as disposeConfig } from "meta3d-pipeline-dispose-protocol/src/ConfigType";
import { config as sceneView1Config } from "meta3d-pipeline-editor-webgl1-scene-view1-three-protocol/src/ConfigType";
import { state as sceneView1State, states as sceneView1States } from "meta3d-pipeline-editor-webgl1-scene-view1-three-protocol/src/StateType";

export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
	return {
		prepare: (meta3dState: meta3dState, isDebug, gl, canvas) => {
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
						pipelineName: "init",
						insertElementName: "init_root_meta3d",
						insertAction: "after"
					},
					{
						pipelineName: "update",
						insertElementName: "update_root_meta3d",
						insertAction: "after"
					},
					{
						pipelineName: "render",
						insertElementName: "render_root_meta3d",
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
						pipelineName: "init",
						insertElementName: "init_root_meta3d",
						insertAction: "after"
					},
					{
						pipelineName: "update",
						insertElementName: "update_camera_camera_meta3d",
						insertAction: "before"
					}
				]
			)

			engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<disposeConfig, disposeState>>(meta3dState, "meta3d-pipeline-dispose-protocol"),
				null,
				[
					{
						pipelineName: "update",
						insertElementName: "update_root_meta3d",
						insertAction: "after"
					}
				]
			)

			engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<sceneView1Config, sceneView1State>>(meta3dState, "meta3d-pipeline-editor-webgl1-scene-view1-three-protocol"),
				null,
				[
					{
						pipelineName: "render",
						insertElementName: "scene_view1_gl_webgl1_use_fbo_meta3d",
						insertAction: "before"
					}
				]
			)





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
