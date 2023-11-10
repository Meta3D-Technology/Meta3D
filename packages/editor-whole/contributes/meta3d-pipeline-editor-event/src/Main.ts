import { pipelineContribute } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType";
import { execFunc as execInitEventJob } from "./jobs/init/InitEventJob";
import { state, states, pipelineName, allPipelineData, job } from "meta3d-pipeline-editor-event-protocol/src/StateType";
import { config } from "meta3d-pipeline-editor-event-protocol/src/ConfigType";
import { getContribute as getContributeMeta3D } from "meta3d-type"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case job.InitEvent:
			return execInitEventJob;
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
				eventService: api.getExtensionService<eventService>(meta3dState, "meta3d-event-protocol"),
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: allPipelineData,
	}
}
