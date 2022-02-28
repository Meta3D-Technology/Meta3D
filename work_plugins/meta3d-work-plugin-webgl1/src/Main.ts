import { getWorkPluginContribute as getWorkPluginContributeMeta3d } from "../../../extension_protocols/meta3d-engine-core-protocol/src/contribute_points/work/IWorkForJs";
import { exec as create_gl } from "./jobs/init/CreateGLJob";
import { config, state, states } from "./Type";

let _getElementFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case "create_gl_meta3d":
			return create_gl;
		default:
			return null
	}
}

let _init = (_state: state) => {
}

export let getWorkPluginContribute: getWorkPluginContributeMeta3d<state, config, states> = ({ mostService, webgl1Service, canvas }) => {
	return {
		pluginName: "meta3d-work-plugin-webgl1",
		createStateFunc: () => {
			return {
				mostService,
				webgl1Service,
				canvas,
				gl: null,
			}
		},
		initFunc: _init,
		getElementFunc: _getElementFunc,
		allPipelineData: [
			{
				name: "init",
				groups: [
					{
						name: "first_webgl1_meta3d",
						link: "concat",
						elements: [
							{
								"name": "create_gl_meta3d",
								"type_": "job"
							}
						]
					}
				],
				first_group: "first_webgl1_meta3d"
			}
		],
	}
}
