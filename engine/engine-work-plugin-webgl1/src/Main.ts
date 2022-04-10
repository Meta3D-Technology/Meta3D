import { getWorkPluginContribute as getWorkPluginContributeMeta3D } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType";
import { execFunc as execPrepareInitDataJob } from "./jobs/init/PrepareInitDataJob"
import { execFunc as execDisposeSceneJob } from "./jobs/update/DisposeSceneJob"
import { execFunc as execPrepareRenderDataJob } from "./jobs/render/PrepareRenderDataJob"
import { config, state, states, workPluginName } from "engine-work-plugin-webgl1-protocol";

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case "prepare_init_data_webgl1_engine":
			return execPrepareInitDataJob
		case "prepare_render_data_webgl1_engine":
			return execPrepareRenderDataJob
		case "dispose_scene_webgl1_engine":
			return execDisposeSceneJob
		default:
			return null
	}
}

let _init = (_state: state) => {
}

export let getWorkPluginContribute: getWorkPluginContributeMeta3D<state, config, states> = ({ isDebug, mostService, webgl1Service, engineCoreService, immutableService, canvas }) => {
	return {
		workPluginName: workPluginName,
		createStateFunc: () => {
			return {
				isDebug,
				mostService,
				webgl1Service,
				engineCoreService,
				immutableService,
				canvas,
				allGeometryIndices: [],
				allMaterialIndices: [],
				viewMatrix: null,
				pMatrix: null,
				allRenderComponents: []
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: [
			{
				name: "init",
				groups: [
					{
						name: "first_webgl1_engine",
						link: "concat",
						elements: [
							{
								"name": "prepare_init_data_webgl1_engine",
								"type_": "job"
							}
						]
					}
				],
				first_group: "first_webgl1_engine"
			},
			{
				name: "update",
				groups: [
					{
						name: "first_webgl1_engine",
						link: "concat",
						elements: [
							{
								"name": "dispose_scene_webgl1_engine",
								"type_": "job"
							}
						]
					}
				],
				first_group: "first_webgl1_engine"
			},
			{
				name: "render",
				groups: [
					{
						name: "first_webgl1_engine",
						link: "concat",
						elements: [
							{
								"name": "prepare_render_data_webgl1_engine",
								"type_": "job"
							}
						]
					}
				],
				first_group: "first_webgl1_engine"
			}
		],
	}
}
