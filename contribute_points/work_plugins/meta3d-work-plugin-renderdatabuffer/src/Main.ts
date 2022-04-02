import { getWorkPluginContribute as getWorkPluginContributeMeta3D } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType";
import { execFunc as execCreateRenderDataBufferJob } from "./jobs/init/CreateRenderDataBufferJob";
import { execFunc as execUpdateRenderDataBufferJob } from "./jobs/update/UpdateRenderDataBufferJob";
import { config, state, states, workPluginName } from "meta3d-work-plugin-renderdatabuffer-protocol";

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case "create_render_data_buffer_renderdatabuffer_meta3d":
			return execCreateRenderDataBufferJob;
		case "update_render_data_buffer_renderdatabuffer_meta3d":
			return execUpdateRenderDataBufferJob;
		default:
			return null
	}
}

let _init = (_state: state) => {
}

export let getWorkPluginContribute: getWorkPluginContributeMeta3D<state, config, states> = ({
	mostService,
	engineCoreService,
	renderDataBufferService,
	transformData,
	geometryData,
	materialData,
	workPluginWhichHasMaxRenderGameObjectCountName,
}) => {
	return {
		workPluginName: workPluginName,
		createStateFunc: () => {
			return {
				mostService,
				engineCoreService,
				renderDataBufferService,
				transformData,
				geometryData,
				materialData,
				workPluginWhichHasMaxRenderGameObjectCountName,
				renderDataBufferTypeArray: null,
				renderGameObjectsCount: 0
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: [
			{
				name: "init",
				groups: [
					{
						name: "first_renderdatabuffer_meta3d",
						link: "concat",
						elements: [
							{
								"name": "create_render_data_buffer_renderdatabuffer_meta3d",
								"type_": "job"
							},
						]
					}
				],
				first_group: "first_renderdatabuffer_meta3d"
			},
			{
				name: "update",
				groups: [
					{
						name: "first_renderdatabuffer_meta3d",
						link: "concat",
						elements: [
							{
								"name": "update_render_data_buffer_renderdatabuffer_meta3d",
								"type_": "job"
							},
						]
					}
				],
				first_group: "first_renderdatabuffer_meta3d"
			}
		],
	}
}
