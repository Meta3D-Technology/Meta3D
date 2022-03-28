import { getWorkPluginContribute as getWorkPluginContributeMeta3D } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType"
import { workPluginName, config, state, states } from "engine-work-plugin-webgl1-worker-render-protocol"
import { execFunc as execGetInitRenderData } from "./jobs/init/GetInitRenderDataJob"
import { execFunc as execRegisterECS } from "./jobs/init/RegisterECSJob"
import { execFunc as execInitGeometry } from "./jobs/init/InitGeometryJob"
import { execFunc as execInitMaterial } from "./jobs/init/InitMaterialJob"
import { execFunc as execSendFinishInitRenderData } from "./jobs/init/SendFinishInitRenderDataJob"
import { execFunc as execGetRenderData } from "./jobs/render/GetRenderDataJob"
import { execFunc as execSendUniformShaderData } from "./jobs/render/SendUniformShaderDataJob"
import { execFunc as execRender } from "./jobs/render/RenderJob"
import { execFunc as execSendFinishRenderData } from "./jobs/render/SendFinishRenderDataJob"

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case "get_init_render_data":
			return execGetInitRenderData
		case "register_ecs":
			return execRegisterECS
		case "init_geometry":
			return execInitGeometry
		case "init_material":
			return execInitMaterial
		case "send_finish_init_render_data":
			return execSendFinishInitRenderData
		case "get_render_data":
			return execGetRenderData
		case "send_uniform_shader_data":
			return execSendUniformShaderData
		case "render":
			return execRender
		case "send_finish_render_data":
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
				vbo: {
					verticesVBOMap: immutableService.createMap(),
					indicesVBOMap: immutableService.createMap(),
				},
				material: {
					programMap: immutableService.createMap()
				},
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
				typeArray: null,
				renderGameObjectsCount: 0
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
							"name": "get_init_render_data",
							"type_": "job"
						},
						{
							"name": "register_ecs",
							"type_": "job"
						},
						{
							"name": "init_geometry",
							"type_": "job"
						},
						{
							"name": "init_material",
							"type_": "job"
						},
						{
							"name": "send_finish_init_render_data",
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
							"name": "get_render_data",
							"type_": "job"
						},
						{
							"name": "send_uniform_shader_data",
							"type_": "job"
						},
						{
							"name": "render",
							"type_": "job"
						},
						{
							"name": "send_finish_render_data",
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
