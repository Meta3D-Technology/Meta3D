import { pipelineContribute } from "meta3d-core-protocol/src/service/ServiceType";
import { execFunc as execInitEventJob } from "./jobs/init/InitEventJob";
import { state, states, pipelineName, allPipelineData, job } from "meta3d-pipeline-event-protocol/src/StateType";
import { config } from "meta3d-pipeline-event-protocol/src/ConfigType";
import { getContribute as getContributeMeta3D } from "meta3d-type"
import { service as coreService } from "meta3d-core-protocol/src/service/ServiceType"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"

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
				mostService: getExn(api.getPackageService<coreService>(meta3dState, "meta3d-core-protocol")).most(meta3dState),
				eventService: getExn(api.getPackageService<eventService>(meta3dState, "meta3d-event-protocol")),
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: allPipelineData,
	}
}
