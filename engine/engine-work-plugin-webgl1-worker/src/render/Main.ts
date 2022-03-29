import { getWorkPluginContribute as getWorkPluginContributeMeta3D } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType"
import { workPluginName, config, state, states } from "engine-work-plugin-webgl1-worker-render-protocol"
import { execFunc as execGetInitRenderData } from "./jobs/init/GetInitRenderDataJob"
import { execFunc as execRegisterECS } from "./jobs/init/RegisterECSJob"
import { execFunc as execSendFinishInitRenderData } from "./jobs/init/SendFinishInitRenderDataJob"
import { execFunc as execGetRenderDataJob } from "./jobs/render/GetRenderDataJob"
import { execFunc as execPrepareRenderDataJob } from "./jobs/render/PrepareRenderDataJob"
import { execFunc as execSendFinishRenderData } from "./jobs/render/SendFinishRenderDataJob"

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case "get_init_render_data_webgl1_worker_render_engine":
			return execGetInitRenderData
		case "register_ecs_webgl1_worker_render_engine":
			return execRegisterECS
		case "send_finish_init_render_data_webgl1_worker_render_engine":
			return execSendFinishInitRenderData
		case "get_render_data_webgl1_worker_render_engine":
			return execGetRenderDataJob
		case "prepare_render_data_webgl1_worker_render_engine":
			return execPrepareRenderDataJob
		case "send_finish_render_data_webgl1_worker_render_engine":
			return execSendFinishRenderData
		default:
			return null
	}
}

let _init = (_state: state) => {
}

export let getWorkPluginContribute: getWorkPluginContributeMeta3D<state, config, states> = ({ isDebug, mostService, engineCoreService, webgl1Service, registerECSService, immutableService }) => {
	return {
		workPluginName: workPluginName,
		createStateFunc: (): state => {
			return {
				isDebug,
				mostService,
				engineCoreService,
				webgl1Service,
				registerECSService,
				immutableService,
				canvas: null,
				viewMatrix: null,
				pMatrix: null,
				allGeometryIndices: [],
				allMaterialIndices: [],
				transformCount: null,
				geometryCount: null,
				geometryPointCount: null,
				pbrMaterialCount: null,
				transformBuffer: null,
				geometryBuffer: null,
				pbrMaterialBuffer: null,
				renderDataBufferTypeArray: null,
				renderGameObjectsCount: 0,
				allRenderComponents: []
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: [{
			name: "init",
			groups: [
				{
					name: "first_webgl1_worker_render_engine",
					link: "concat",
					elements: [
						{
							"name": "get_init_render_data_webgl1_worker_render_engine",
							"type_": "job"
						},
						{
							"name": "register_ecs_webgl1_worker_render_engine",
							"type_": "job"
						},
						{
							"name": "send_finish_init_render_data_webgl1_worker_render_engine",
							"type_": "job"
						},
					]
				}
			],
			first_group: "first_webgl1_worker_render_engine"
		},
		{
			name: "render",
			groups: [
				{
					name: "first_webgl1_worker_render_engine",
					link: "concat",
					elements: [
						{
							"name": "get_render_data_webgl1_worker_render_engine",
							"type_": "job"
						},
						{
							"name": "prepare_render_data_webgl1_worker_render_engine",
							"type_": "job"
						},
						{
							"name": "send_finish_render_data_webgl1_worker_render_engine",
							"type_": "job"
						},
					]
				}
			],
			first_group: "first_webgl1_worker_render_engine"
		}
		],
	}
}
