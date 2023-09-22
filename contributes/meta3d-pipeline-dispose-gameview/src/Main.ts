import { pipelineContribute } from "meta3d-engine-core-gameview-protocol/src/contribute/work/PipelineContributeType";
import { execFunc as execDispose } from "./jobs/update/DisposeJob";
import { state, states, pipelineName, allPipelineData, job } from "meta3d-pipeline-dispose-gameview-protocol/src/StateType";
import { config } from "meta3d-pipeline-dispose-gameview-protocol/src/ConfigType";
import { getContribute as getContributeMeta3D } from "meta3d-type"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case job.Dispose:
			return execDispose;
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
				mostService: api.getExtensionService<mostService>(meta3dState, "meta3d-bs-most-protocol")
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: allPipelineData,
	}
}
