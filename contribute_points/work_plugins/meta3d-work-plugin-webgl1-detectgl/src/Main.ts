import { getWorkPluginContribute as getWorkPluginContributeMeta3D } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType";
import { execFunc as execDetectGL } from "./jobs/init/DetectGLJob";
import { config, state, states, workPluginName } from "meta3d-work-plugin-webgl1-detectgl-protocol";

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case "detect_gl_webgl1_detectgl_meta3d":
			return execDetectGL;
		default:
			return null
	}
}

let _init = (_state: state) => {
}

export let getWorkPluginContribute: getWorkPluginContributeMeta3D<state, config, states> = ({ mostService, webgl1Service }) => {
	return {
		workPluginName: workPluginName,
		createStateFunc: () => {
			return {
				mostService,
				webgl1Service
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: [
			{
				name: "init",
				groups: [
					{
						name: "first_webgl1_detectgl_meta3d",
						link: "concat",
						elements: [
							{
								"name": "detect_gl_webgl1_detectgl_meta3d",
								"type_": "job"
							},
						]
					}
				],
				first_group: "first_webgl1_detectgl_meta3d"
			}
		],
	}
}
