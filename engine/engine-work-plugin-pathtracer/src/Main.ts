import { getWorkPluginContribute as getWorkPluginContributeMeta3D } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType";
import { execFunc as execInitWebGPUJob } from "./jobs/init/InitWebGPUJob"
import { execFunc as execInitRasterizationPassJob } from "./jobs/init/InitRasterizationPassJob"
import { execFunc as execRenderRasterizationPassJob } from "./jobs/render/RenderRasterizationPassJob"
import { execFunc as execEndRenderJob } from "./jobs/render/EndRenderJob"
import { config, state, states, workPluginName } from "engine-work-plugin-pathtracer-protocol";

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case "init_webgpu_pathtracer_engine":
			return execInitWebGPUJob
		case "init_rasterization_pass_pathtracer_engine":
			return execInitRasterizationPassJob
		case "render_pathtracer_engine":
			return execRenderRasterizationPassJob
		case "end_pathtracer_engine":
			return execEndRenderJob
		default:
			return null
	}
}

let _init = (_state: state) => {
}

export let getWorkPluginContribute: getWorkPluginContributeMeta3D<state, config, states> = ({ mostService, webgpuService, engineCoreService, fsService, width, height, dirname }) => {
	return {
		workPluginName: workPluginName,
		createStateFunc: () => {
			return {
				mostService,
				webgpuService,
				engineCoreService,
				fsService,
				width,
				height,
				dirname,
				window: null,
				device: null,
				adapter: null,
				context: null,
				queue: null,
				swapChainFormat: null,
				swapChain: null,
				vertexBuffer: null,
				indexBuffer: null,
				renderPipeline: null,
				indexCount: null,
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: [
			{
				name: "init",
				groups: [
					{
						name: "first_pathtracer_engine",
						link: "concat",
						elements: [
							{
								"name": "init_webgpu_pathtracer_engine",
								"type_": "job"
							},
							{
								"name": "init_rasterization_pass_pathtracer_engine",
								"type_": "job"
							}
						]
					}
				],
				first_group: "first_pathtracer_engine"
			},
			{
				name: "render",
				groups: [
					{
						name: "first_pathtracer_engine",
						link: "concat",
						elements: [
							{
								"name": "render_pathtracer_engine",
								"type_": "job"
							},
							{
								"name": "end_pathtracer_engine",
								"type_": "job"
							}
						]
					}
				],
				first_group: "first_pathtracer_engine"
			}
		],
	}
}
