import { pipelineContribute } from "meta3d-core-protocol/src/service/ServiceType";
import { execFunc as execCreateDefaultScene } from "./jobs/init/CreateDefaultSceneJob";
import { execFunc as execInit } from "./jobs/init/InitJob";
import { execFunc as execConvertSceneGraph } from "./jobs/render/ConvertSceneGraphJob";
import { execFunc as execRender } from "./jobs/render/RenderJob";
import { state, states, pipelineName, allPipelineData, job } from "meta3d-pipeline-webgl1-three-webrender-protocol/src/StateType";
import { config } from "meta3d-pipeline-webgl1-three-webrender-protocol/src/ConfigType";
import { getContribute as getContributeMeta3D } from "meta3d-type"
import { service as coreService } from "meta3d-core-protocol/src/service/ServiceType"
import { service as threeService } from "meta3d-three-protocol/src/service/ServiceType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case job.ConvertSceneGraph:
			return execConvertSceneGraph;
		case job.Init:
			return execInit;
		case job.Render:
			return execRender;
		case job.CreateDefaultScene:
			return execCreateDefaultScene
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
				mostService: getExn(api.getPackageService<coreService>(meta3dState, "meta3d-core-protocol")).most(meta3dState),
				converterService: getExn(api.getPackageService<threeService>(meta3dState, "meta3d-three-protocol")).converter(meta3dState),
				threeAPIService: getExn(api.getPackageService<threeService>(meta3dState, "meta3d-three-protocol")).api(meta3dState),

				renderer: null,
				composer: null,
				renderPass: null,
				canvas,
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: allPipelineData,
	}
}
