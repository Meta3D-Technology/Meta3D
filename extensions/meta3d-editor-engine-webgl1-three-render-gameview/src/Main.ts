import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState } from "meta3d-type"
import { state } from "meta3d-editor-engine-render-gameview-protocol/src/state/StateType"
import { service } from "meta3d-editor-engine-render-gameview-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-gameview-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-gameview-protocol/src/state/StateType"
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


			TODO register game view1
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
