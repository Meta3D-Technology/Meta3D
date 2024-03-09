import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { state } from "meta3d-engine-web-render-protocol/src/state/StateType"
import { service } from "meta3d-engine-web-render-protocol/src/service/ServiceType"
import { service as engineWholeService } from "meta3d-engine-whole-protocol/src/service/ServiceType"
import { service as coreService, pipelineContribute } from "meta3d-core-protocol/src/service/ServiceType"
import {
	state as threeState
} from "meta3d-pipeline-webgl1-three-webrender-protocol/src/StateType";
import { config as threeConfig } from "meta3d-pipeline-webgl1-three-webrender-protocol/src/ConfigType";
import { pipelineRootPipeline, pipelineRootJob } from "meta3d-core-protocol/src/state/StateType"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils";

let _prepare = (api: api, meta3dState: meta3dState, canvas: HTMLCanvasElement) => {
	let engineCoreService = getExn(api.getPackageService<coreService>(
		meta3dState,
		"meta3d-core-protocol"
	)).engineCore(meta3dState)

	let { registerPipeline } = engineCoreService

	meta3dState = registerPipeline(meta3dState, api.getContribute<pipelineContribute<threeConfig, threeState>>(meta3dState, "meta3d-pipeline-webgl1-three-webrender-protocol"),
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

	return Promise.resolve(meta3dState)
}

export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
	return {
		getViewRect: (meta3dState) => {
			return api.getExtensionState<state>(meta3dState, "meta3d-engine-web-render-protocol").viewRect
		},
		setViewRect: (meta3dState, viewRect) => {
			return api.setExtensionState<state>(meta3dState, "meta3d-engine-web-render-protocol", {
				...api.getExtensionState<state>(meta3dState, "meta3d-engine-web-render-protocol"),
				viewRect
			})
		},
		getSelectedObjects: (meta3dState) => {
			return api.getExtensionState<state>(meta3dState, "meta3d-engine-web-render-protocol").selectedObjects
		},
		setSelectedObjects: (meta3dState, selectedObjects) => {
			return api.setExtensionState<state>(meta3dState, "meta3d-engine-web-render-protocol", {
				...api.getExtensionState<state>(meta3dState, "meta3d-engine-web-render-protocol"),
				selectedObjects
			})
		},
	}
}

export let createExtensionState: createExtensionStateMeta3D<
	state
> = () => {
	return {
		viewRect: null,
		selectedObjects: []
	}
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
	return {
		onRegister: (meta3dState, service) => {
			let { addToInitFuncs } = getExn(api.getPackageService<engineWholeService>(meta3dState, "meta3d-engine-whole-protocol"))

			return addToInitFuncs(meta3dState, (meta3dState, canvas) => _prepare(api, meta3dState, canvas))
		},
	}
}
