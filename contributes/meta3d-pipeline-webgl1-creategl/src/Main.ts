import { pipelineContribute } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType";
import { execFunc as execCreateGL } from "./jobs/init/CreateGLJob";
import { config } from "meta3d-pipeline-webgl1-creategl-protocol/src/ConfigType";
import { state, states, pipelineName } from "meta3d-pipeline-webgl1-creategl-protocol/src/StateType";
import { getContribute as getContributeMeta3D } from "meta3d-type"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case "create_gl_webgl1_creategl_meta3d":
			return execCreateGL;
		default:
			return null
	}
}

let _init = (_state: state) => {
}

export let getContribute: getContributeMeta3D<pipelineContribute<config, state>> = (api) => {
	return {
		pipelineName: pipelineName,
		createStateFunc: (meta3dState, { canvas }) => {
			return {
				mostService: api.getExtensionService<mostService>(meta3dState, "meta3d-bs-most-protocol"),
				webgl1Service: api.getExtensionService<webgl1Service>(meta3dState, "meta3-webgl1-protocol"),
				canvas: canvas
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: [
			{
				name: "init",
				groups: [
					{
						name: "first_webgl1_creategl_meta3d",
						link: "concat",
						elements: [
							{
								"name": "create_gl_webgl1_creategl_meta3d",
								"type_": "job"
							},
						]
					}
				],
				first_group: "first_webgl1_creategl_meta3d"
			}
		],
	}
}
