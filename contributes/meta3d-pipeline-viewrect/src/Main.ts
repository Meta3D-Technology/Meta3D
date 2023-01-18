import { pipelineContribute } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType";
import { execFunc as execGetViewRectJob } from "./jobs/init/GetViewRectJob"
import { dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap } from "meta3d-pipeline-viewrect-protocol/src/DependentMapType";
import { config } from "meta3d-pipeline-viewrect-protocol/src/ConfigType";
import { state, states, pipelineName } from "meta3d-pipeline-viewrect-protocol/src/StateType";
import { getContribute as getContributeMeta3D } from "meta3d-type"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"


let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case "get_viewrect_engine":
			return execGetViewRectJob
		default:
			return null
	}
}

let _init = (_state: state) => {
}

export let getContribute: getContributeMeta3D<dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap, pipelineContribute<config, state>> = (api, dependentMapData) => {
	let {
		meta3dBsMostExtensionProtocolName,
	} = dependentMapData[0]

	return {
		pipelineName: pipelineName,
		createStateFunc: (meta3dState, { canvas }) => {
			return {
				mostService: api.getExtensionService<mostService>(meta3dState, meta3dBsMostExtensionProtocolName),
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
						name: "first_engine",
						link: "concat",
						elements: [
							{
								"name": "get_viewrect_engine",
								"type_": "job"
							}
						]
					}
				],
				first_group: "first_engine"
			},
		],
	}
}
