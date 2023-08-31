import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState } from "meta3d-type"
import { state } from "meta3d-editor-engine-render-protocol/src/state/StateType"
import { service } from "meta3d-editor-engine-render-protocol/src/service/ServiceType"
import { pipelineContribute } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { config as sceneView1Config } from "meta3d-pipeline-editor-webgl1-scene-view1-three-protocol/src/ConfigType";
import { state as sceneView1State, states as sceneView1States } from "meta3d-pipeline-editor-webgl1-scene-view1-three-protocol/src/StateType";
import { pipeline as pipelineSceneView1Pipeline, job as pipelineSceneView1Job } from "meta3d-pipeline-editor-webgl1-scene-view1-protocol/src/StateType"
import { prepare as prepareUtils } from "meta3d-editor-engine-webgl1-three-render-utils/src/Main"

export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
	return {
		prepare: (meta3dState: meta3dState, isDebug, gl, canvas) => {
			let engineCoreProtocolName = "meta3d-engine-core-protocol"

			meta3dState = prepareUtils(meta3dState, api, isDebug, gl, canvas, engineCoreProtocolName)


			let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, engineCoreProtocolName)

			let engineCoreService = api.getExtensionService<engineCoreService>(
				meta3dState,
				engineCoreProtocolName
			)


			let { registerPipeline } = engineCoreService


			engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<sceneView1Config, sceneView1State>>(meta3dState, "meta3d-pipeline-editor-webgl1-scene-view1-three-protocol"),
				null,
				[
					{
						pipelineName: pipelineSceneView1Pipeline.Render,
						insertElementName: pipelineSceneView1Job.UseFBO,
						insertAction: "before"
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
