import { pipelineContribute } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType";
import { execFunc as execGetViewRectForInitJob } from "./jobs/init/GetViewRectJob"
import { execFunc as execGetViewRectForUpdateJob } from "./jobs/update/GetViewRectJob"
import { config } from "meta3d-pipeline-viewrect-protocol/src/ConfigType";
import { state, states, pipelineName, allPipelineData, job } from "meta3d-pipeline-viewrect-protocol/src/StateType";
import { getContribute as getContributeMeta3D } from "meta3d-type"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case job.GetViewRectForInit:
			return execGetViewRectForInitJob
		case job.GetViewRectForUpdate:
			return execGetViewRectForUpdateJob
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
				canvas: canvas,
				viewRect: null
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: allPipelineData,
	}
}
