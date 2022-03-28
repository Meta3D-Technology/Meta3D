import { getWorkPluginContribute as getWorkPluginContributeMeta3D } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType";
import { execFunc as execPrepareInitDataJob } from "./jobs/init/PrepareInitDataJob"
import { execFunc as execSendCameraData } from "./jobs/render/SendUniformShaderDataJob";
import { execFunc as execRender } from "./jobs/render/RenderJob";
import { config, state, states, workPluginName } from "engine-work-plugin-webgl1-protocol";

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case "prepare_init_data_webgl_engine":
			return execPrepareInitDataJob
		case "send_uniform_shader_data_webgl_engine":
			return execSendCameraData;
		case "render_webgl_engine":
			return execRender;
		default:
			return null
	}
}

let _init = (_state: state) => {
}

export let getWorkPluginContribute: getWorkPluginContributeMeta3D<state, config, states> = ({ isDebug, mostService, webgl1Service, engineCoreService, immutableService, canvas }) => {
	return {
		workPluginName: workPluginName,
		createStateFunc: () => {
			return {
				isDebug,
				mostService,
				webgl1Service,
				engineCoreService,
				immutableService,
				canvas,
				allGeometryIndices: [],
				allMaterialIndices: []
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: [
			{
				name: "init",
				groups: [
					{
						name: "first_webgl1_engine",
						link: "concat",
						elements: [
							{
								"name": "prepare_init_data_webgl_engine",
								"type_": "job"
							}
						]
					}
				],
				first_group: "first_webgl1_engine"
			},
			{
				name: "render",
				groups: [
					{
						name: "first_webgl_engine",
						link: "concat",
						elements: [
							{
								"name": "send_uniform_shader_data_webgl_engine",
								"type_": "job"
							},
							{
								"name": "render_webgl_engine",
								"type_": "job"
							},
						]
					}
				],
				first_group: "first_webgl_engine"
			}
		],
	}
}
