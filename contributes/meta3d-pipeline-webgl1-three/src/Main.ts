import { pipelineContribute } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType";
import { execFunc as execInit } from "./jobs/init/InitJob";
import { execFunc as execConvertSceneGraph } from "./jobs/update/ConvertSceneGraphJob";
import { execFunc as execRender } from "./jobs/render/RenderJob";
import { state, states, pipelineName } from "meta3d-pipeline-webgl1-three-protocol/src/StateType";
import { config } from "meta3d-pipeline-webgl1-three-protocol/src/ConfigType";
import { getContribute as getContributeMeta3D } from "meta3d-type"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { service as converterService } from "meta3d-scenegraph-converter-three-protocol/src/service/ServiceType"

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case "convert_scenegraph_three_meta3d":
			return execConvertSceneGraph;
		case "init_three_meta3d":
			return execInit;
		case "render_three_meta3d":
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
		createStateFunc: (meta3dState, _) => {
			return {
				mostService: api.getExtensionService<mostService>(meta3dState, "meta3d-bs-most-protocol"),
				uiService: api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol"),
				converterService: api.getExtensionService<converterService>(meta3dState, "meta3d-scene-graph-converter-three-protocol"),

				renderer: null,
				// canvas,
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: [
			{
				name: "init",
				groups: [
					{
						name: "first_three_meta3d",
						link: "concat",
						elements: [
							{
								"name": "init_three_meta3d",
								"type_": "job"
							},
						]
					}
				],
				first_group: "first_three_meta3d"
			},
			{
				name: "update",
				groups: [
					{
						name: "first_three_meta3d",
						link: "concat",
						elements: [
							{
								"name": "convert_scenegraph_three_meta3d",
								"type_": "job"
							},
						]
					}
				],
				first_group: "first_three_meta3d"
			},
			{
				name: "render",
				groups: [
					{
						name: "first_three_meta3d",
						link: "concat",
						elements: [
							{
								"name": "render_three_meta3d",
								"type_": "job"
							},
						]
					}
				],
				first_group: "first_three_meta3d"
			},
		],
	}
}
