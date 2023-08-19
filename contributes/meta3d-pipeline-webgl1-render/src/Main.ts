import { pipelineContribute } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType";
import { execFunc as execRenderJob } from "./jobs/render/RenderJob";
import { config } from "meta3d-pipeline-webgl1-render-protocol/src/ConfigType";
import { state, states, pipelineName, allPipelineData, job } from "meta3d-pipeline-webgl1-render-protocol/src/StateType";
import { getContribute as getContributeMeta3D } from "meta3d-type"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { service as immutableService } from "meta3d-immutable-protocol/src/service/ServiceType"

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case job.Render:
			return execRenderJob;
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
				engineCoreService: api.getExtensionService<engineCoreService>(meta3dState, "meta3d-engine-core-protocol"),
				immutableService: api.getExtensionService<immutableService>(meta3dState, "meta3d-immutable-protocol")
				,

			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: allPipelineData,
	}
}
