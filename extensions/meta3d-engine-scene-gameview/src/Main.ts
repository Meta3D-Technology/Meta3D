import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { service as engineCoreService } from "meta3d-engine-core-gameview-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-gameview-protocol/src/state/StateType"
import { state } from "meta3d-engine-scene-gameview-protocol/src/state/StateType"
import { service } from "meta3d-engine-scene-gameview-protocol/src/service/ServiceType"
import { pipelineContribute } from "meta3d-engine-core-gameview-protocol/src/contribute/work/PipelineContributeType"
import { state as cameraPipelineState, states as cameraPipelineStates } from "meta3d-pipeline-camera-gameview-protocol/src/StateType";
import { config as cameraPipelineConfig } from "meta3d-pipeline-camera-gameview-protocol/src/ConfigType";
import { state as transformPipelineState, states as transformPipelineStates } from "meta3d-pipeline-transform-gameview-protocol/src/StateType";
import { config as transformPipelineConfig } from "meta3d-pipeline-transform-gameview-protocol/src/ConfigType";
import { pipeline as pipelineRootPipeline, job as pipelineRootJob } from "meta3d-pipeline-root-gameview-protocol/src/StateType"
import { pipeline as pipelineCameraPipeline, job as pipelineCameraJob } from "meta3d-pipeline-camera-gameview-protocol/src/StateType"
import { getExtensionServiceUtils } from "meta3d-engine-scene-sceneview-utils/src/Main"

export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
	return getExtensionServiceUtils(
		(engineCoreState: engineCoreState, { registerPipeline }: engineCoreService, meta3dState: meta3dState, isDebug: boolean) => {
			engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<cameraPipelineConfig, cameraPipelineState>>(meta3dState, "meta3d-pipeline-camera-gameview-protocol"),
				{
					isDebug,
				},
				[
					{
						pipelineName: pipelineRootPipeline.Update,
						insertElementName: pipelineRootJob.Update,
						insertAction: "after"
					}
				]
			)

			engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<transformPipelineConfig, transformPipelineState>>(meta3dState, "meta3d-pipeline-transform-gameview-protocol"),
				null,
				[
					{
						pipelineName: pipelineCameraPipeline.Update,
						insertElementName: pipelineCameraJob.UpdateCamera,
						insertAction: "after"
					},
				]
			)

			return engineCoreState
		},
		api, "meta3d-engine-core-gameview-protocol")
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
