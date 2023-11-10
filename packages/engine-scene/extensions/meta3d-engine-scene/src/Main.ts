import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state } from "meta3d-engine-scene-protocol/src/state/StateType"
import { service } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { pipelineContribute } from "meta3d-core-protocol/src/service/ServiceType"
import { state as cameraPipelineState, states as cameraPipelineStates } from "meta3d-pipeline-camera-protocol/src/StateType";
import { config as cameraPipelineConfig } from "meta3d-pipeline-camera-protocol/src/ConfigType";
import { state as transformPipelineState, states as transformPipelineStates } from "meta3d-pipeline-transform-protocol/src/StateType";
import { config as transformPipelineConfig } from "meta3d-pipeline-transform-protocol/src/ConfigType";
import { pipelineRootPipeline, pipelineRootJob } from "meta3d-core-protocol/src/state/StateType"
import { pipeline as pipelineCameraPipeline, job as pipelineCameraJob } from "meta3d-pipeline-camera-protocol/src/StateType"
import { getExtensionServiceUtils } from "meta3d-engine-scene-utils/src/Main"

export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
	return getExtensionServiceUtils(
		(meta3dState: meta3dState, { registerPipeline }: engineCoreService, isDebug: boolean) => {
			meta3dState = registerPipeline(meta3dState, api.getContribute<pipelineContribute<cameraPipelineConfig, cameraPipelineState>>(meta3dState, "meta3d-pipeline-camera-protocol"),
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

			meta3dState = registerPipeline(meta3dState, api.getContribute<pipelineContribute<transformPipelineConfig, transformPipelineState>>(meta3dState, "meta3d-pipeline-transform-protocol"),
				null,
				[
					{
						pipelineName: pipelineCameraPipeline.Update,
						insertElementName: pipelineCameraJob.UpdateCamera,
						insertAction: "after"
					},
				]
			)

			return meta3dState
		},
		api)
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
