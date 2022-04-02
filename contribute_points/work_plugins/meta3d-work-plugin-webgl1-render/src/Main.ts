import { getWorkPluginContribute as getWorkPluginContributeMeta3D } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType";
import { execFunc as execRenderJob } from "./jobs/render/RenderJob";
import { config, state, states, workPluginName } from "meta3d-work-plugin-webgl1-render-protocol";

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case "render_webgl1_render_meta3d":
			return execRenderJob;
		default:
			return null
	}
}

let _init = (_state: state) => {
}

export let getWorkPluginContribute: getWorkPluginContributeMeta3D<state, config, states> = ({ mostService, engineCoreService, immutableService, webgl1Service, workPluginWhichHasAllRenderComponentsName, transformData, geometryData }) => {
	return {
		workPluginName: workPluginName,
		createStateFunc: () => {
			return {
				mostService,
				engineCoreService,
				immutableService,
				webgl1Service,
				workPluginWhichHasAllRenderComponentsName,
				transformData,
				geometryData
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: [
			{
				name: "render",
				groups: [
					{
						name: "first_webgl1_render_meta3d",
						link: "concat",
						elements: [
							{
								"name": "render_webgl1_render_meta3d",
								"type_": "job"
							},
						]
					}
				],
				first_group: "first_webgl1_render_meta3d"
			}
		],
	}
}
