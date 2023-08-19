import { pipelineContribute } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType";
import { execFunc as execInitJob } from "./jobs/init/InitJob"
import { execFunc as execRenderJob } from "./jobs/render/RenderJob"
import { state, states, pipelineName, allPipelineData, job } from "meta3d-pipeline-editor-webgpu-triangle-protocol/src/StateType";
import { config } from "meta3d-pipeline-editor-webgpu-triangle-protocol/src/ConfigType";
import { getContribute as getContributeMeta3D } from "meta3d-type"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { service as webgpuService } from "meta3d-webgpu-protocol/src/service/ServiceType"

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case job.Init:
			return execInitJob
		case job.Render:
			return execRenderJob
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
				uiService: api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol"),
				webgpuService: api.getExtensionService<webgpuService>(meta3dState, "meta3d-webgpu-protocol"),
				device: null,
				context: null,
				renderPipeline: null
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: allPipelineData,
	}
}
