// import { Map } from "immutable"
import { getWorkPluginContribute as getWorkPluginContributeMeta3D } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType";
import { execFunc as create_gl } from "./jobs/init/CreateGLJob";
import { config, state, states, workPluginName } from "engine-work-plugin-webgl-protocol";

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case "create_gl_meta3d":
			return create_gl;
		default:
			return null
	}
}

let _init = (_state: state) => {
}

export let getWorkPluginContribute: getWorkPluginContributeMeta3D<state, config, states> = ({ mostService, webgl1Service, canvas }) => {
	return {
		workPluginName: workPluginName,
		createStateFunc: () => {
			return {
				mostService,
				webgl1Service,
				canvas,
				gl: null,
				// vbo: {
				// 	verticesVBOMap: Map<number, WebGLBuffer>(),
				// 	indicesVBOMap: Map<number, WebGLBuffer>()
				// },
				// material: {
				// 	programMap: Map<number, WebGLProgram>()
				// }
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
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
