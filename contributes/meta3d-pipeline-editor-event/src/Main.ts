import { pipelineContribute } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType";
import { execFunc as execInitEventJob } from "./jobs/init/InitEventJob";
import { state, states, pipelineName } from "meta3d-pipeline-editor-event-protocol/src/StateType";
import { dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap } from "meta3d-pipeline-editor-event-protocol/src/DependentMapType";
import { config } from "meta3d-pipeline-editor-event-protocol/src/ConfigType";
import { getContribute as getContributeMeta3D } from "meta3d-type"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case "event_init_event_meta3d":
			return execInitEventJob;
		default:
			return null
	}
}

let _init = (_state: state) => {
}

export let getContribute: getContributeMeta3D<dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap, pipelineContribute<config, state>> = (api, dependentMapData) => {
	let {
		meta3dBsMostExtensionProtocolName,
		meta3dEventExtensionProtocolName
	} = dependentMapData[0]

	return {
		pipelineName: pipelineName,
		createStateFunc: (meta3dState, _) => {
			return {
				mostService: api.getExtensionService<mostService>(meta3dState, meta3dBsMostExtensionProtocolName),
				eventService: api.getExtensionService<eventService>(meta3dState, meta3dEventExtensionProtocolName),
				meta3dEventExtensionProtocolName: meta3dEventExtensionProtocolName
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: [
			{
				name: "init",
				groups: [
					{
						name: "first_event_meta3d",
						link: "concat",
						elements: [
							{
								"name": "event_init_event_meta3d",
								"type_": "job"
							},
						]
					}
				],
				first_group: "first_event_meta3d"
			}
		],
	}
}
