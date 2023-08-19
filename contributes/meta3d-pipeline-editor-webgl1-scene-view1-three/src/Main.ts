import { pipelineContribute } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType";
import { execFunc as execReset } from "./jobs/render/ResetJob";
import { config } from "meta3d-pipeline-editor-webgl1-scene-view1-three-protocol/src/ConfigType";
import { state, states, pipelineName, allPipelineData, job } from "meta3d-pipeline-editor-webgl1-scene-view1-three-protocol/src/StateType";
import { getContribute as getContributeMeta3D } from "meta3d-type"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case job.Reset:
			return execReset;
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
