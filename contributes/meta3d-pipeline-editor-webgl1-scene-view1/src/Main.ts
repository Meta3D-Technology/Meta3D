import { pipelineContribute } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType";
import { execFunc as execPrepareFBO } from "./jobs/init/PrepareFBOJob";
import { execFunc as execUpdate } from "./jobs/update/UpdateJob";
import { execFunc as execUpdateFBO } from "./jobs/render/UseFBOJob";
import { dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap } from "meta3d-pipeline-editor-webgl1-scene-view1-protocol/src/DependentMapType";
import { config } from "meta3d-pipeline-editor-webgl1-scene-view1-protocol/src/ConfigType";
import { state, states, pipelineName } from "meta3d-pipeline-editor-webgl1-scene-view1-protocol/src/StateType";
import { getContribute as getContributeMeta3D } from "meta3d-type"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { service as engineWholeService } from "meta3d-engine-whole-protocol/src/service/ServiceType"

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case "scene_view1_gl_webgl1_prepare_fbo_meta3d":
			return execPrepareFBO;
		case "scene_view1_gl_webgl1_update_meta3d":
			return execUpdate;
		case "scene_view1_gl_webgl1_update_fbo_meta3d":
			return execUpdateFBO;
		default:
			return null
	}
}

let _init = (_state: state) => {
}

export let getContribute: getContributeMeta3D<dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap, pipelineContribute<config, state>> = (api, dependentMapData) => {
	let {
		meta3dWebgl1ExtensionProtocolName,
		meta3dBsMostExtensionProtocolName,
		meta3dUIExtensionProtocolName,
		meta3dEngineWholeExtensionProtocolName
	} = dependentMapData[0]

	return {
		pipelineName: pipelineName,
		createStateFunc: (meta3dState, _) => {
			return {
				mostService: api.getExtensionService<mostService>(meta3dState, meta3dBsMostExtensionProtocolName),
				webgl1Service: api.getExtensionService<webgl1Service>(meta3dState, meta3dWebgl1ExtensionProtocolName),
				uiService: api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionProtocolName),
				engineWholeService: api.getExtensionService<engineWholeService>(meta3dState, meta3dEngineWholeExtensionProtocolName),
				meta3dUIExtensionProtocolName: meta3dUIExtensionProtocolName,
				cameraGameObject: null,
				fbo: null
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: [
			{
				name: "init",
				groups: [
					{
						name: "first_webgl1_scene_view1_meta3d",
						link: "concat",
						elements: [
							{
								"name": "scene_view1_gl_webgl1_prepare_fbo_meta3d",
								"type_": "job"
							},
						]
					}
				],
				first_group: "first_webgl1_scene_view1_meta3d"
			},
			{
				name: "update",
				groups: [
					{
						name: "first_webgl1_scene_view1_meta3d",
						link: "concat",
						elements: [
							{
								"name": "scene_view1_gl_webgl1_update_meta3d",
								"type_": "job"
							},
						]
					}
				],
				first_group: "first_webgl1_scene_view1_meta3d"
			},
			{
				name: "render",
				groups: [
					{
						name: "first_webgl1_scene_view1_meta3d",
						link: "concat",
						elements: [
							{
								"name": "scene_view1_gl_webgl1_update_fbo_meta3d",
								"type_": "job"
							},
						]
					}
				],
				first_group: "first_webgl1_scene_view1_meta3d"
			}
		],
	}
}
