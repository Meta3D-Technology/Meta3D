import { getWorkPluginContribute as getWorkPluginContributeMeta3D } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType";
import { execFunc as execSendUniformShaderDataJob } from "./jobs/render/SendUniformShaderDataJob";
import { config, state, states, workPluginName } from "meta3d-work-plugin-webgl1-senduniformshaderdata-protocol";

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case "send_uniform_shader_data_webgl1_senduniformshaderdata_meta3d":
			return execSendUniformShaderDataJob;
		default:
			return null
	}
}

let _init = (_state: state) => {
}

export let getWorkPluginContribute: getWorkPluginContributeMeta3D<state, config, states> = ({ mostService, webgl1Service, workPluginWhichHasUniformShaderDataName }) => {
	return {
		workPluginName: workPluginName,
		createStateFunc: () => {
			return {
				mostService,
				webgl1Service,
				workPluginWhichHasUniformShaderDataName
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: [
			{
				name: "render",
				groups: [
					{
						name: "first_webgl1_senduniformshaderdata_meta3d",
						link: "concat",
						elements: [
							{
								"name": "send_uniform_shader_data_webgl1_senduniformshaderdata_meta3d",
								"type_": "job"
							},
						]
					}
				],
				first_group: "first_webgl1_senduniformshaderdata_meta3d"
			}
		],
	}
}
