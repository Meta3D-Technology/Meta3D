import { pipelineContribute } from "meta3d-engine-core-sceneview-protocol/src/contribute/work/PipelineContributeType";
import { execFunc as execDetectGL } from "./jobs/init/DetectGLJob";
import { config } from "meta3d-pipeline-webgl1-detectgl-protocol/src/ConfigType";
import { state, states, pipelineName } from "meta3d-pipeline-webgl1-detectgl-protocol/src/StateType";
import { getContribute as getContributeMeta3D } from "meta3d-type"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { allPipelineData, job } from "meta3d-pipeline-webgl1-detectgl-protocol/src/StateType";

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case job.DetectGL:
			return execDetectGL;
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
		allPipelineData: allPipelineData,
	}
}
