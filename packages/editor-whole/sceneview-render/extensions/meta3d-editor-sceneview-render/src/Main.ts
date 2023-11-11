import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { state } from "meta3d-editor-sceneview-render-protocol/src/state/StateType"
import { service } from "meta3d-editor-sceneview-render-protocol/src/service/ServiceType"
import { service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { service as coreService, pipelineContribute } from "meta3d-core-protocol/src/service/ServiceType"
import {
	state as threeState
} from "meta3d-pipeline-webgl1-three-sceneviewrender-protocol/src/StateType";
import { config as threeConfig } from "meta3d-pipeline-webgl1-three-sceneviewrender-protocol/src/ConfigType";
import { state as disposeState } from "meta3d-pipeline-dispose-protocol/src/StateType";
import { config as disposeConfig } from "meta3d-pipeline-dispose-protocol/src/ConfigType";
import { pipelineRootPipeline, pipelineRootJob } from "meta3d-core-protocol/src/state/StateType"
import { state as eventState } from "meta3d-pipeline-editor-event-protocol/src/StateType";
import { config as eventConfig } from "meta3d-pipeline-editor-event-protocol/src/ConfigType";
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";

let _prepare = (api: api, meta3dState: meta3dState, canvas: HTMLCanvasElement) => {
	let engineCoreService = getExn(api.getPackageService<coreService>(
		meta3dState,
		"meta3d-core-protocol"
	)).engineCore(meta3dState)

	let { registerPipeline } = engineCoreService

	meta3dState = registerPipeline(meta3dState, api.getContribute<pipelineContribute<threeConfig, threeState>>(meta3dState, "meta3d-pipeline-webgl1-three-sceneviewrender-protocol"),
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
				pipelineName: pipelineRootPipeline.Render,
				insertElementName: pipelineRootJob.Render,
				insertAction: "after"
			}
		]
	)

	meta3dState = registerPipeline(meta3dState, api.getContribute<pipelineContribute<disposeConfig, disposeState>>(meta3dState, "meta3d-pipeline-dispose-protocol"),
		null,
		[
			{
				pipelineName: pipelineRootPipeline.Update,
				insertElementName: pipelineRootJob.Update,
				insertAction: "after"
			}
		]
	)

	meta3dState = registerPipeline(meta3dState, api.getContribute<pipelineContribute<eventConfig, eventState>>(meta3dState, "meta3d-pipeline-editor-event-protocol"),
		null,
		[
			{
				pipelineName: pipelineRootPipeline.Init,
				insertElementName: pipelineRootJob.Init,
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
			return api.getExtensionState<state>(meta3dState, "meta3d-editor-sceneview-render-protocol").viewRect
		},
		setViewRect: (meta3dState, viewRect) => {
			return api.setExtensionState<state>(meta3dState, "meta3d-editor-sceneview-render-protocol", {
				...api.getExtensionState<state>(meta3dState, "meta3d-editor-sceneview-render-protocol"),
				viewRect
			})
		},
		getArcballCameraControllerGameObject: (meta3dState) => {
			return api.getExtensionState<state>(meta3dState, "meta3d-editor-sceneview-render-protocol").arcballCameraControllerGameObject
		},
		setArcballCameraControllerGameObject: (meta3dState, arcballCameraControllerGameObject) => {
			return api.setExtensionState<state>(meta3dState, "meta3d-editor-sceneview-render-protocol", {
				...api.getExtensionState<state>(meta3dState, "meta3d-editor-sceneview-render-protocol"),
				arcballCameraControllerGameObject
			})
		},
		getDefaultActiveCameraView: (meta3dState) => {
			return api.getExtensionState<state>(meta3dState, "meta3d-editor-sceneview-render-protocol").defaultActiveCameraView
		},
		setDefaultActiveCameraView: (meta3dState, defaultActiveCameraView) => {
			return api.setExtensionState<state>(meta3dState, "meta3d-editor-sceneview-render-protocol", {
				...api.getExtensionState<state>(meta3dState, "meta3d-editor-sceneview-render-protocol"),
				defaultActiveCameraView
			})
		}
	}
}

export let createExtensionState: createExtensionStateMeta3D<
	state
> = () => {
	return {
		viewRect: null,
		arcballCameraControllerGameObject: null,
		defaultActiveCameraView: null,
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
