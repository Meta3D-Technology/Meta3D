import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState } from "meta3d-type"
import { state } from "meta3d-editor-engine-render-gameview-protocol/src/state/StateType"
import { service } from "meta3d-editor-engine-render-gameview-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-gameview-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-gameview-protocol/src/state/StateType"
import { pipelineContribute } from "meta3d-engine-core-gameview-protocol/src/contribute/work/PipelineContributeType"
import { config as view1Config } from "meta3d-pipeline-editor-webgl1-view1-three-protocol/src/ConfigType";
import { state as view1State } from "meta3d-pipeline-editor-webgl1-view1-three-protocol/src/StateType";
import { pipeline as pipelineGameView1Pipeline, job as pipelineGameView1Job } from "meta3d-pipeline-editor-webgl1-game-view1-protocol/src/StateType"
import { prepare as prepareUtils } from "meta3d-editor-engine-webgl1-three-render-utils/src/Main"

export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
	return {
		prepare: (meta3dState: meta3dState, isDebug, gl, canvas) => {
			let engineCoreProtocolName = "meta3d-engine-core-gameview-protocol"

			meta3dState = prepareUtils(meta3dState, api, isDebug, gl, canvas, engineCoreProtocolName)


			let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, engineCoreProtocolName)

			let engineCoreService = api.getExtensionService<engineCoreService>(
				meta3dState,
				engineCoreProtocolName
			)


			let { registerPipeline } = engineCoreService


			engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<view1Config, view1State>>(meta3dState, "meta3d-pipeline-editor-webgl1-view1-three-protocol"),
				null,
				[
					{
						pipelineName: pipelineGameView1Pipeline.Render,
						insertElementName: pipelineGameView1Job.UseFBO,
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
