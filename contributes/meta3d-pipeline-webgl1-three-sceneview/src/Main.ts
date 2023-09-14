import { pipelineContribute } from "meta3d-engine-core-sceneview-protocol/src/contribute/work/PipelineContributeType";
import { execFunc as execInit } from "./jobs/init/InitJob";
import { execFunc as execConvertSceneGraph } from "./jobs/update/ConvertSceneGraphJob";
import { execFunc as execRender } from "./jobs/render/RenderJob";
import { state, states, pipelineName, allPipelineData, job } from "meta3d-pipeline-webgl1-three-sceneview-protocol/src/StateType";
import { config } from "meta3d-pipeline-webgl1-three-sceneview-protocol/src/ConfigType";
import { getContribute as getContributeMeta3D } from "meta3d-type"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { service as converterService } from "meta3d-scenegraph-converter-three-sceneview-protocol/src/service/ServiceType"
import { service as threeAPIService } from "meta3d-three-api-protocol/src/service/ServiceType"

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case job.ConvertSceneGraph:
			return execConvertSceneGraph;
		case job.Init:
			return execInit;
		case job.Render:
			return execRender;
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
				uiService: api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol"),
				converterService: api.getExtensionService<converterService>(meta3dState, "meta3d-scenegraph-converter-three-sceneview-protocol"),
				threeAPIService: api.getExtensionService<threeAPIService>(meta3dState, "meta3d-three-api-protocol"),

				renderer: null,
				canvas,
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: allPipelineData,
	}
}
