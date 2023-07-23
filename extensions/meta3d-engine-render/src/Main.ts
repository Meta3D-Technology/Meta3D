import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState } from "meta3d-type"
import { state } from "meta3d-engine-render-protocol/src/state/StateType"
import { service } from "meta3d-engine-render-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { pipelineContribute } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { state as viewRectState, states as viewRectStates } from "meta3d-pipeline-viewrect-protocol/src/StateType";
import { config as viewRectConfig } from "meta3d-pipeline-viewrect-protocol/src/ConfigType";
import { state as createGLState, states as createGLStates } from "meta3d-pipeline-webgl1-creategl-protocol/src/StateType";
import { config as createGLConfig } from "meta3d-pipeline-webgl1-creategl-protocol/src/ConfigType";
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
	service
> = (api) => {
		return {
			prepare: (meta3dState: meta3dState, isDebug, canvas) => {
				let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, "meta3d-engine-core-protocol")

				let engineCoreService = api.getExtensionService<engineCoreService>(
					meta3dState,
					"meta3d-engine-core-protocol"
				)


				let { registerPipeline } = engineCoreService

				engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<viewRectConfig, viewRectState>>(meta3dState,  "meta3d-pipeline-viewrect-protocol"),
					{
						canvas: canvas
					},
					[
						{
							pipelineName: "init",
							insertElementName: "init_root_meta3d",
							insertAction: "after"
						}
					]
				)

				engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<createGLConfig, createGLState>>(meta3dState,  "meta3d-pipeline-webgl1-creategl-protocol"),
					{
						canvas: canvas
					},
					[
						{
							pipelineName: "init",
							insertElementName: "init_root_meta3d",
							insertAction: "after"
						}
					]
				)



				engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<detectGLConfig, detectGLState>>(meta3dState,  "meta3d-pipeline-webgl1-detectgl-protocol"),
					null,
					[
						{
							pipelineName: "init",
							insertElementName: "create_gl_webgl1_creategl_meta3d",
							insertAction: "after"
						}
					]
				)

				engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<geometryConfig, geometryState>>(meta3dState,  "meta3d-pipeline-webgl1-geometry-protocol"),
					null,
					[
						{
							pipelineName: "update",
							insertElementName: "prepare_update_data_webgl1_engine",
							insertAction: "after"
						}
					]
				)

				engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<materialConfig, materialState>>(meta3dState,  "meta3d-pipeline-webgl1-material-protocol"),
					null,
					[
						{
							pipelineName: "update",
							insertElementName: "prepare_update_data_webgl1_engine",
							insertAction: "after"
						}
					]
				)

				engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<senduniformshaderdataConfig, senduniformshaderdataState>>(meta3dState,  "meta3d-pipeline-webgl1-senduniformshaderdata-protocol"),
					null,
					[
						{
							pipelineName: "render",
							insertElementName: "prepare_render_data_webgl1_engine",
							insertAction: "after"
						}
					]
				)

				engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<renderConfig, renderState>>(meta3dState,  "meta3d-pipeline-webgl1-render-protocol"),
					null,
					[
						{
							pipelineName: "render",
							insertElementName: "send_uniform_shader_data_webgl1_senduniformshaderdata_meta3d",
							insertAction: "after"
						}
					]
				)

				engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<dataConfig, dataState>>(meta3dState,  "meta3d-pipeline-webgl1-data-protocol"),
					{
						isDebug: isDebug
					},
					[
						{
							pipelineName: "update",
							insertElementName: "update_root_meta3d",
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
						"meta3d-engine-core-protocol",
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
