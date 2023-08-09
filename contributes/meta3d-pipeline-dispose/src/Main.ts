import { pipelineContribute } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType";
import { execFunc as execDispose } from "./jobs/update/DisposeJob";
import { state, states, pipelineName } from "meta3d-pipeline-dispose-protocol/src/StateType";
import { config } from "meta3d-pipeline-dispose-protocol/src/ConfigType";
import { getContribute as getContributeMeta3D } from "meta3d-type"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case "dispose_dispose_meta3d":
			return execDispose;
		default:
			return null
	}
}

let _init = (_state: state) => {
}

export let getContribute: getContributeMeta3D< pipelineContribute<config, state>> = (api) => {
	return {
		pipelineName: pipelineName,
		createStateFunc: (meta3dState, _) => {
			return {
				mostService: api.getExtensionService<mostService>(meta3dState, "meta3d-bs-most-protocol")
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: [
			{
				name: "update",
				groups: [
					{
						name: "first_dispose_meta3d",
						link: "concat",
						elements: [
							{
								"name": "dispose_dispose_meta3d",
								"type_": "job"
							},
						]
					}
				],
				first_group: "first_dispose_meta3d"
			}
		],
	}
}
