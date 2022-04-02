import { getWorkPluginContribute as getWorkPluginContributeMeta3D } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType";
import { execFunc as execCreateGL } from "./jobs/init/CreateGLJob";
import { config, state, states, workPluginName } from "meta3d-work-plugin-webgl1-creategl-protocol";

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case "create_gl_webgl1_creategl_meta3d":
			return execCreateGL;
		default:
			return null
	}
}

let _init = (_state: state) => {
}

export let getWorkPluginContribute: getWorkPluginContributeMeta3D<state, config, states> = ({ mostService, webgl1Service, workPluginWhichHasCanvasName }) => {
	return {
		workPluginName: workPluginName,
		createStateFunc: () => {
			return {
				mostService,
				webgl1Service,
				workPluginWhichHasCanvasName,
				gl: null
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: [
			{
				name: "init",
				groups: [
					{
						name: "first_webgl1_creategl_meta3d",
						link: "concat",
						elements: [
							{
								"name": "create_gl_webgl1_creategl_meta3d",
								"type_": "job"
							},
						]
					}
				],
				first_group: "first_webgl1_creategl_meta3d"
			}
		],
	}
}
