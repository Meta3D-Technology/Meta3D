import { pipelineContribute } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType";
import { execFunc as execSendUniformShaderDataJob } from "./jobs/render/SendUniformShaderDataJob";
import { config } from "meta3d-pipeline-webgl1-senduniformshaderdata-protocol/src/ConfigType";
import { state, states, pipelineName } from "meta3d-pipeline-webgl1-senduniformshaderdata-protocol/src/StateType";
import { getContribute as getContributeMeta3D } from "meta3d-type"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"


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

export let getContribute: getContributeMeta3D<pipelineContribute<config, state>> = (api) => {
	return {
		pipelineName: pipelineName,
		createStateFunc: (meta3dState, _) => {
			return {
				mostService: api.getExtensionService<mostService>(meta3dState, "meta3d-bs-most-protocol"),
				webgl1Service: api.getExtensionService<webgl1Service>(meta3dState, "meta3d-webgl1-protocol"),
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
