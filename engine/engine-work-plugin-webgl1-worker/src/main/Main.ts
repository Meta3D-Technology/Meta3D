import { getWorkPluginContribute as getWorkPluginContributeMeta3D } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType"
import { workPluginName, config, state, states } from "engine-work-plugin-webgl1-worker-main-protocol"
import { execFunc as execCreateWorkerInstance } from "./jobs/init/CreateWorkerInstanceJob"
import { execFunc as execSendInitRenderData } from "./jobs/init/SendInitRenderDataJob"
import { execFunc as execGetFinishSendInitRenderData } from "./jobs/init/GetFinishSendInitRenderDataJob"
import { execFunc as execSendRenderData } from "./jobs/update/SendRenderDataJob"
import { execFunc as execSendBeginLoopData } from "./jobs/update/SendBeginLoopDataJob"
import { execFunc as execGeiFinishRenderData } from "./jobs/render/GetFinishRenderDataJob"

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case "create_worker_instance_webgl1_worker_main_engine":
			return execCreateWorkerInstance
		case "send_init_render_data_webgl1_worker_main_engine":
			return execSendInitRenderData
		case "get_finish_send_init_render_data_webgl1_worker_main_engine":
			return execGetFinishSendInitRenderData
		case "send_render_data_webgl1_worker_main_engine":
			return execSendRenderData
		case "send_begin_loop_data_webgl1_worker_main_engine":
			return execSendBeginLoopData
		case "get_finish_render_data_webgl1_worker_main_engine":
			return execGeiFinishRenderData
		default:
			return null
	}
}

let _init = (state: state) => {
	console.log("init: ", state)
}

export let getWorkPluginContribute: getWorkPluginContributeMeta3D<state, config, states> = ({ isDebug, mostService, engineCoreService, webgl1WorkerSyncService, canvas, maxRenderGameObjectCount }) => {
	return {
		workPluginName: workPluginName,
		createStateFunc: (): state => {
			return {
				isDebug,
				mostService,
				engineCoreService,
				webgl1WorkerSyncService,
				canvas,
				worker: null,
				maxRenderGameObjectCount
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: [{
			name: "init",
			groups: [
				{
					name: "first_webgl1_worker_main_engine",
					link: "concat",
					elements: [
						{
							"name": "create_worker_instance_webgl1_worker_main_engine",
							"type_": "job"
						},
						{
							"name": "begin_init",
							"type_": "group"
						}
					]
				},
				{
					name: "begin_init",
					link: "merge",
					elements: [
						{
							"name": "init",
							"type_": "group"
						},
						{
							"name": "get_finish_send_init_render_data_webgl1_worker_main_engine",
							"type_": "job",
							"is_set_state": false
						}
					]
				},
				{
					name: "init",
					link: "concat",
					elements: [
						{
							"name": "send_init_render_data_webgl1_worker_main_engine",
							"type_": "job"
						}
					]
				}
			],
			first_group: "first_webgl1_worker_main_engine"
		},
		{
			name: "update",
			groups: [
				{
					name: "first_webgl1_worker_main_engine",
					link: "concat",
					elements: [
						{
							"name": "begin_update",
							"type_": "group"
						}
					]
				},
				{
					name: "begin_update",
					link: "concat",
					elements: [
						{
							"name": "send_begin_loop_data_webgl1_worker_main_engine",
							"type_": "job"
						},
						{
							"name": "send_render_data_webgl1_worker_main_engine",
							"type_": "job"
						}
					]
				}
			],
			first_group: "first_webgl1_worker_main_engine"
		},
		{
			name: "render",
			groups: [
				{
					name: "first_webgl1_worker_main_engine",
					link: "concat",
					elements: [
						{
							"name": "get_finish_render_data_webgl1_worker_main_engine",
							"type_": "job"
						}
					]
				}
			],
			first_group: "first_webgl1_worker_main_engine"
		}
		],
	}
}
