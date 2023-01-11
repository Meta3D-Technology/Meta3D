import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState } from "meta3d-type"
import { state } from "meta3d-engine-render-protocol/src/state/StateType"
import { service } from "meta3d-engine-render-protocol/src/service/ServiceType"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-engine-render-protocol/src/service/DependentMapType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { workPluginContribute } from "meta3d-engine-core-protocol/src/contribute/work/WorkPluginContributeType"
import { state as createGLState, states as createGLStates } from "meta3d-work-plugin-webgl1-creategl-protocol/src/StateType";
import { config as createGLConfig } from "meta3d-work-plugin-webgl1-creategl-protocol/src/ConfigType";
import { state as detectGLState, states as detectGLStates } from "meta3d-work-plugin-webgl1-detectgl-protocol/src/StateType";
import { config as detectGLConfig } from "meta3d-work-plugin-webgl1-detectgl-protocol/src/ConfigType";
import { state as geometryState, states as geometryStates } from "meta3d-work-plugin-webgl1-geometry-protocol/src/StateType";
import { config as geometryConfig } from "meta3d-work-plugin-webgl1-geometry-protocol/src/ConfigType";
import { state as materialState, states as materialStates } from "meta3d-work-plugin-webgl1-material-protocol/src/StateType";
import { config as materialConfig } from "meta3d-work-plugin-webgl1-material-protocol/src/ConfigType";
import { state as dataState, states as dataStates, workPluginName as dataWorkPluginName } from "meta3d-work-plugin-webgl1-data-protocol/src/StateType";
import { config as dataConfig } from "meta3d-work-plugin-webgl1-data-protocol/src/ConfigType";
import { state as renderState, states as renderStates } from "meta3d-work-plugin-webgl1-render-protocol/src/StateType";
import { config as renderConfig } from "meta3d-work-plugin-webgl1-render-protocol/src/ConfigType";
import { state as senduniformshaderdataState, states as senduniformshaderdataStates } from "meta3d-work-plugin-webgl1-senduniformshaderdata-protocol/src/StateType";
import { config as senduniformshaderdataConfig } from "meta3d-work-plugin-webgl1-senduniformshaderdata-protocol/src/ConfigType";

export let getExtensionService: getExtensionServiceMeta3D<
	dependentExtensionNameMap,
	dependentContributeNameMap,
	service
> = (api, [{
	meta3dEngineCoreExtensionName,
}, {
	meta3dWorkPluginWebgl1CreateGLContributeName,
	meta3dWorkPluginWebgl1DetectGLContributeName,
	meta3dWorkPluginWebgl1GeometryContributeName,
	meta3dWorkPluginWebgl1MaterialContributeName,
	meta3dWorkPluginWebgl1DataContributeName,
	meta3dWorkPluginWebgl1RenderContributeName,
	meta3dWorkPluginWebgl1SenduniformshaderdataContributeName,
}]) => {
		return {
			prepare: (meta3dState: meta3dState, isDebug, canvas) => {
				let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, meta3dEngineCoreExtensionName)

				let engineCoreService = api.getExtensionService<engineCoreService>(
					meta3dState,
					meta3dEngineCoreExtensionName
				)


				let { registerWorkPlugin } = engineCoreService


				engineCoreState = registerWorkPlugin(engineCoreState, api.getContribute<workPluginContribute<createGLConfig, createGLState, createGLStates>>(meta3dState, meta3dWorkPluginWebgl1CreateGLContributeName),
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

				engineCoreState = registerWorkPlugin(engineCoreState, api.getContribute<workPluginContribute<detectGLConfig, detectGLState, detectGLStates>>(meta3dState, meta3dWorkPluginWebgl1DetectGLContributeName),
					null,
					[
						{
							pipelineName: "init",
							insertElementName: "create_gl_webgl1_creategl_meta3d",
							insertAction: "after"
						}
					]
				)

				engineCoreState = registerWorkPlugin(engineCoreState, api.getContribute<workPluginContribute<geometryConfig, geometryState, geometryStates>>(meta3dState, meta3dWorkPluginWebgl1GeometryContributeName),
					{
						workPluginWhichHasAllGeometryIndicesName: dataWorkPluginName
					},
					[
						{
							pipelineName: "init",
							insertElementName: "prepare_init_data_webgl1_engine",
							insertAction: "after"
						}
					]
				)

				engineCoreState = registerWorkPlugin(engineCoreState, api.getContribute<workPluginContribute<materialConfig, materialState, materialStates>>(meta3dState, meta3dWorkPluginWebgl1MaterialContributeName),
					{
						workPluginWhichHasAllMaterialIndicesName: dataWorkPluginName
					},
					[
						{
							pipelineName: "init",
							insertElementName: "prepare_init_data_webgl1_engine",
							insertAction: "after"
						}
					]
				)

				engineCoreState = registerWorkPlugin(engineCoreState, api.getContribute<workPluginContribute<senduniformshaderdataConfig, senduniformshaderdataState, senduniformshaderdataStates>>(meta3dState, meta3dWorkPluginWebgl1SenduniformshaderdataContributeName),
					{
						workPluginWhichHasUniformShaderDataName: dataWorkPluginName
					},
					[
						{
							pipelineName: "render",
							insertElementName: "prepare_render_data_webgl1_engine",
							insertAction: "after"
						}
					]
				)

				engineCoreState = registerWorkPlugin(engineCoreState, api.getContribute<workPluginContribute<renderConfig, renderState, renderStates>>(meta3dState, meta3dWorkPluginWebgl1RenderContributeName),
					{
						workPluginWhichHasAllRenderComponentsName: dataWorkPluginName
					},
					[
						{
							pipelineName: "render",
							insertElementName: "send_uniform_shader_data_webgl1_senduniformshaderdata_meta3d",
							insertAction: "after"
						}
					]
				)

				engineCoreState = registerWorkPlugin(engineCoreState, api.getContribute<workPluginContribute<dataConfig, dataState, dataStates>>(meta3dState, meta3dWorkPluginWebgl1DataContributeName),
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
						meta3dEngineCoreExtensionName,
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
