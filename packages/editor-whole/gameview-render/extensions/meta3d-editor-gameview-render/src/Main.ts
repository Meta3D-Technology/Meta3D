import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { state, pipelineStatus } from "meta3d-editor-gameview-render-protocol/src/state/StateType"
import { service } from "meta3d-editor-gameview-render-protocol/src/service/ServiceType"
import { service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { service as coreService, pipelineContribute, jobOrders } from "meta3d-core-protocol/src/service/ServiceType"
import {
	state as threeState
} from "meta3d-pipeline-webgl1-three-gameviewrender-protocol/src/StateType";
import { config as threeConfig } from "meta3d-pipeline-webgl1-three-gameviewrender-protocol/src/ConfigType";
import { pipelineRootPipeline, pipelineRootJob } from "meta3d-core-protocol/src/state/StateType"
import { pipeline as pipelineSceneViewRenderPipeline, job as pipelineSceneViewRenderJob } from "meta3d-pipeline-webgl1-three-sceneviewrender-protocol/src/StateType"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils";

let _prepare = (api: api, meta3dState: meta3dState, canvas: HTMLCanvasElement) => {
	let engineCoreService = getExn(api.getPackageService<coreService>(
		meta3dState,
		"meta3d-core-protocol"
	)).engineCore(meta3dState)

	let { registerPipeline } = engineCoreService

	let jobOrders: jobOrders
	if (!isNullable(api.getPackageService(meta3dState, "meta3d-editor-sceneview-render-protocol"))) {
		jobOrders = [
			{
				pipelineName: pipelineSceneViewRenderPipeline.Init,
				insertElementName: pipelineSceneViewRenderJob.CreateDefaultScene,
				insertAction: "after"
			},
			{
				pipelineName: pipelineSceneViewRenderPipeline.Render,
				insertElementName: pipelineSceneViewRenderJob.RestoreActivedCamera,
				insertAction: "after"
			}
		]
	}
	else {
		jobOrders = [
			{
				pipelineName: pipelineRootPipeline.Init,
				insertElementName: pipelineRootJob.Init,
				insertAction: "after"
			},
			{
				pipelineName: pipelineRootPipeline.Render,
				insertElementName: pipelineRootJob.Render,
				insertAction: "after"
			}
		]
	}

	meta3dState = registerPipeline(meta3dState, api.getContribute<pipelineContribute<threeConfig, threeState>>(meta3dState, "meta3d-pipeline-webgl1-three-gameviewrender-protocol"),
		{
			canvas
		},
		jobOrders
	)

	return Promise.resolve(meta3dState)
}

export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
	return {
		getViewRect: (meta3dState) => {
			return api.getExtensionState<state>(meta3dState, "meta3d-editor-gameview-render-protocol").viewRect
		},
		setViewRect: (meta3dState, viewRect) => {
			return api.setExtensionState<state>(meta3dState, "meta3d-editor-gameview-render-protocol", {
				...api.getExtensionState<state>(meta3dState, "meta3d-editor-gameview-render-protocol"),
				viewRect
			})
		},
		isPipelineStop: (meta3dState) => {
			return api.getExtensionState<state>(meta3dState, "meta3d-editor-gameview-render-protocol").pipelineStatus == pipelineStatus.Stop
		},
		isPipelineRunOnlyOnce: (meta3dState) => {
			return api.getExtensionState<state>(meta3dState, "meta3d-editor-gameview-render-protocol").pipelineStatus == pipelineStatus.RunOnlyOnce
		},
		start: (meta3dState) => {
			return api.setExtensionState<state>(meta3dState, "meta3d-editor-gameview-render-protocol", {
				...api.getExtensionState<state>(meta3dState, "meta3d-editor-gameview-render-protocol"),
				pipelineStatus: pipelineStatus.Start
			})
		},
		stop: (meta3dState) => {
			return api.setExtensionState<state>(meta3dState, "meta3d-editor-gameview-render-protocol", {
				...api.getExtensionState<state>(meta3dState, "meta3d-editor-gameview-render-protocol"),
				pipelineStatus: pipelineStatus.Stop
			})

		},
		runOnlyOnce: (meta3dState) => {
			return api.setExtensionState<state>(meta3dState, "meta3d-editor-gameview-render-protocol", {
				...api.getExtensionState<state>(meta3dState, "meta3d-editor-gameview-render-protocol"),
				pipelineStatus: pipelineStatus.RunOnlyOnce
			})
		},
	}
}

export let createExtensionState: createExtensionStateMeta3D<
	state
> = () => {
	return {
		viewRect: null,
		pipelineStatus: pipelineStatus.RunOnlyOnce
	}
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
	return {
		onRegister: (meta3dState, service) => {
			let { addToInitFuncs } = getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))

			return addToInitFuncs(meta3dState, (meta3dState, { canvas }) => _prepare(api, meta3dState, canvas))
		},
	}
}
