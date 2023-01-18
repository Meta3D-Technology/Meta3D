import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState } from "meta3d-type"
import { state } from "meta3d-editor-engine-render-protocol/src/state/StateType"
import { service } from "meta3d-editor-engine-render-protocol/src/service/ServiceType"
import { dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap } from "meta3d-editor-engine-render-protocol/src/service/DependentMapType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { pipelineContribute } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { state as viewRectState, states as viewRectStates } from "meta3d-pipeline-editor-viewrect-protocol/src/StateType";
import { config as viewRectConfig } from "meta3d-pipeline-editor-viewrect-protocol/src/ConfigType";
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

export let getExtensionService: getExtensionServiceMeta3D<
	dependentExtensionProtocolNameMap,
	dependentContributeProtocolNameMap,
	service
> = (api, [{
	meta3dEngineCoreExtensionProtocolName,
}, {
	meta3dPipelineEditorViewRectContributeName,
	meta3dPipelineEditorWebgl1GetGLContributeName,
	meta3dPipelineWebgl1DetectGLContributeName,
	meta3dPipelineWebgl1GeometryContributeName,
	meta3dPipelineWebgl1MaterialContributeName,
	meta3dPipelineWebgl1DataContributeName,
	meta3dPipelineWebgl1RenderContributeName,
	meta3dPipelineWebgl1SenduniformshaderdataContributeName,
}]) => {
		return {
			prepare: (meta3dState: meta3dState, isDebug, gl) => {
				let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, meta3dEngineCoreExtensionProtocolName)

				let engineCoreService = api.getExtensionService<engineCoreService>(
					meta3dState,
					meta3dEngineCoreExtensionProtocolName
				)


				let { registerPipeline } = engineCoreService

				engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<viewRectConfig, viewRectState>>(meta3dState, meta3dPipelineEditorViewRectContributeName),
					null,
					[
						{
							pipelineName: "update",
							insertElementName: "update_root_meta3d",
							insertAction: "after"
						}
					]
				)

				engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<getGLConfig, getGLState>>(meta3dState, meta3dPipelineEditorWebgl1GetGLContributeName),
					null,
					[
						{
							pipelineName: "init",
							insertElementName: "init_root_meta3d",
							insertAction: "after"
						}
					]
				)

				engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<detectGLConfig, detectGLState>>(meta3dState, meta3dPipelineWebgl1DetectGLContributeName),
					null,
					[
						{
							pipelineName: "init",
							insertElementName: "create_gl_webgl1_creategl_meta3d",
							insertAction: "after"
						}
					]
				)

				engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<geometryConfig, geometryState>>(meta3dState, meta3dPipelineWebgl1GeometryContributeName),
					null,
					[
						{
							pipelineName: "init",
							insertElementName: "prepare_init_data_webgl1_engine",
							insertAction: "after"
						}
					]
				)

				engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<materialConfig, materialState>>(meta3dState, meta3dPipelineWebgl1MaterialContributeName),
					null,
					[
						{
							pipelineName: "init",
							insertElementName: "prepare_init_data_webgl1_engine",
							insertAction: "after"
						}
					]
				)

				engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<senduniformshaderdataConfig, senduniformshaderdataState>>(meta3dState, meta3dPipelineWebgl1SenduniformshaderdataContributeName),
					null,
					[
						{
							pipelineName: "render",
							insertElementName: "prepare_render_data_webgl1_engine",
							insertAction: "after"
						}
					]
				)

				engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<renderConfig, renderState>>(meta3dState, meta3dPipelineWebgl1RenderContributeName),
					null,
					[
						{
							pipelineName: "render",
							insertElementName: "send_uniform_shader_data_webgl1_senduniformshaderdata_meta3d",
							insertAction: "after"
						}
					]
				)

				engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<dataConfig, dataState>>(meta3dState, meta3dPipelineWebgl1DataContributeName),
					{
						isDebug: isDebug
					},
					[
						{
							pipelineName: "init",
							insertElementName: "detect_gl_webgl1_detectgl_meta3d",
							insertAction: "after"
						},
						{
							pipelineName: "render",
							insertElementName: "render_root_meta3d",
							insertAction: "after"
						}
					]
				)



				meta3dState =
					api.setExtensionState(
						meta3dState,
						meta3dEngineCoreExtensionProtocolName,
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
