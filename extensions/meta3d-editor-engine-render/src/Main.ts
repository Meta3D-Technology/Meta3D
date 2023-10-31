import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState } from "meta3d-type"
import { state } from "meta3d-editor-engine-render-sceneview-protocol/src/state/StateType"
import { service } from "meta3d-editor-engine-render-sceneview-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-sceneview-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-sceneview-protocol/src/state/StateType"
import { pipelineContribute } from "meta3d-engine-core-sceneview-protocol/src/contribute/work/PipelineContributeType"
import { state as getGLState, states as getGLStates } from "meta3d-pipeline-editor-webgl1-getgl-protocol/src/StateType";
import { config as getGLConfig } from "meta3d-pipeline-editor-webgl1-getgl-protocol/src/ConfigType";
import { state as detectGLState, states as detectGLStates } from "meta3d-pipeline-webgl1-detectgl-protocol/src/StateType";
import { config as detectGLConfig } from "meta3d-pipeline-webgl1-detectgl-protocol/src/ConfigType";
import { state as geometryState, states as geometryStates } from "meta3d-pipeline-webgl1-geometry-protocol/src/StateType";
import { config as geometryConfig } from "meta3d-pipeline-webgl1-geometry-protocol/src/ConfigType";
import { state as materialState, states as materialStates } from "meta3d-pipeline-webgl1-material-protocol/src/StateType";
import { config as materialConfig } from "meta3d-pipeline-webgl1-material-protocol/src/ConfigType";
import { state as dataState, states as dataStates, pipelineName as dataPipelineName } from "meta3d-pipeline-webgl1-data-protocol/src/StateType";
import { config as dataConfig } from "meta3d-pipeline-webgl1-data-protocol/src/ConfigType";
import { state as renderState, states as renderStates } from "meta3d-pipeline-webgl1-render-protocol/src/StateType";
import { config as renderConfig } from "meta3d-pipeline-webgl1-render-protocol/src/ConfigType";
import { state as senduniformshaderdataState, states as senduniformshaderdataStates } from "meta3d-pipeline-webgl1-senduniformshaderdata-protocol/src/StateType";
import { config as senduniformshaderdataConfig } from "meta3d-pipeline-webgl1-senduniformshaderdata-protocol/src/ConfigType";
import { pipeline as pipelineRootPipeline, job as pipelineRootJob } from "meta3d-pipeline-root-sceneview-protocol/src/StateType"
import { pipeline as pipelineCameraPipeline, job as pipelineCameraJob } from "meta3d-pipeline-camera-sceneview-protocol/src/StateType"
import { pipeline as pipelineGetGLPipeline, job as pipelineGetGLJob } from "meta3d-pipeline-editor-webgl1-getgl-protocol/src/StateType"
import { pipeline as pipelineDataPipeline, job as pipelineDataJob } from "meta3d-pipeline-webgl1-data-protocol/src/StateType"
import { pipeline as pipelineSendUniformShaderDataPipeline, job as pipelineSendUniformShaderJob } from "meta3d-pipeline-webgl1-senduniformshaderdata-protocol/src/StateType"

export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
	return {
		prepare: (meta3dState: meta3dState, isDebug, gl, canvas) => {
			let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, "meta3d-engine-core-sceneview-protocol")

			let engineCoreService = api.getExtensionService<engineCoreService>(
				meta3dState,
				"meta3d-engine-core-sceneview-protocol"
			)


			let { registerPipeline } = engineCoreService

			engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<getGLConfig, getGLState>>(meta3dState, "meta3d-pipeline-editor-webgl1-getgl-protocol"),
				null,
				[
					{
						pipelineName: pipelineRootPipeline.Init,
						insertElementName: pipelineRootJob.Init,
						insertAction: "after"
					}
				]
			)

			engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<detectGLConfig, detectGLState>>(meta3dState, "meta3d-pipeline-webgl1-detectgl-protocol"),
				null,
				[
					{
						pipelineName: pipelineGetGLPipeline.Init,
						insertElementName: pipelineGetGLJob.GetGL,
						insertAction: "after"
					}
				]
			)

			engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<geometryConfig, geometryState>>(meta3dState, "meta3d-pipeline-webgl1-geometry-protocol"),
				null,
				[
					{
						pipelineName: pipelineDataPipeline.Update,
						insertElementName:
							pipelineDataJob.PrepareUpdateData,
						insertAction: "after"
					}
				]
			)

			engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<materialConfig, materialState>>(meta3dState, "meta3d-pipeline-webgl1-material-protocol"),
				null,
				[
					{
						pipelineName: pipelineDataPipeline.Update,
						insertElementName:
							pipelineDataJob.PrepareUpdateData,
						insertAction: "after"
					}
				]
			)

			engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<senduniformshaderdataConfig, senduniformshaderdataState>>(meta3dState, "meta3d-pipeline-webgl1-senduniformshaderdata-protocol"),
				null,
				[
					{
						pipelineName: pipelineDataPipeline.Render,
						insertElementName: pipelineDataJob.PrepareRenderData,
						insertAction: "after"
					}
				]
			)

			engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<renderConfig, renderState>>(meta3dState, "meta3d-pipeline-webgl1-render-protocol"),
				null,
				[
					{
						pipelineName: pipelineSendUniformShaderDataPipeline.Render,
						insertElementName: pipelineSendUniformShaderJob.SendUniformShaderData,
						insertAction: "after"
					}
				]
			)

			engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<dataConfig, dataState>>(meta3dState, "meta3d-pipeline-webgl1-data-protocol"),
				{
					isDebug: isDebug
				},
				[
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



			meta3dState =
				api.setExtensionState(
					meta3dState,
					"meta3d-engine-core-sceneview-protocol",
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
