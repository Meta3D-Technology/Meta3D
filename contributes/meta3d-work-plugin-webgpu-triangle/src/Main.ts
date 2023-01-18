import { workPluginContribute } from "meta3d-engine-core-protocol/src/contribute/work/WorkPluginContributeType";
import { execFunc as execInitJob } from "./jobs/init/InitJob"
import { execFunc as execRenderJob } from "./jobs/render/RenderJob"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-work-plugin-webgpu-triangle-protocol/src/DependentMapType";
import { config } from "meta3d-work-plugin-webgpu-triangle-protocol/src/Config";
import { state, states, workPluginName } from "meta3d-work-plugin-webgpu-triangle-protocol/src/StateType";
import { getContribute as getContributeMeta3D } from "meta3d-type"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgpuService } from "meta3d-webgpu-protocol/src/service/ServiceType"

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case "init_webgpu_triangle_meta3d":
			return execInitJob
		case "render_webgpu_triangle_meta3d":
			return execRenderJob
		default:
			return null
	}
}

let _init = (_state: state) => {
}

export let getContribute: getContributeMeta3D<dependentExtensionNameMap, dependentContributeNameMap, workPluginContribute<config, state>> = (api, dependentMapData) => {
	let {
		meta3dWebGPUExtensionName,
		meta3dBsMostExtensionName
	} = dependentMapData[0]

	return {
		workPluginName: workPluginName,
		createStateFunc: (meta3dState, _) => {
			return {
				mostService: api.getExtensionService<mostService>(meta3dState, meta3dBsMostExtensionName),
				webgpuService: api.getExtensionService<webgpuService>(meta3dState, meta3dWebGPUExtensionName),
				device: null,
				context: null,
				renderPipeline: null
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: [
			{
				name: "init",
				groups: [
					{
						name: "first_triangle_meta3d",
						link: "concat",
						elements: [
							{
								"name": "init_webgpu_triangle_meta3d",
								"type_": "job"
							}
						]
					}
				],
				first_group: "first_triangle_meta3d"
			},
			{
				name: "render",
				groups: [
					{
						name: "first_triangle_meta3d",
						link: "concat",
						elements: [
							{
								"name": "render_webgpu_triangle_meta3d",
								"type_": "job"
							},
						]
					}
				],
				first_group: "first_triangle_meta3d"
			}
		],
	}
}
