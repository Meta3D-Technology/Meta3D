import { Map } from "immutable"
import { getWorkPluginContribute as getWorkPluginContributeMeta3D } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType";
import { execFunc as create_gl } from "./jobs/init/CreateGLJob";
import { execFunc as init_webgl_extension } from "./jobs/init/InitWebGLExtensionJob"
import { execFunc as init_geometry } from "./jobs/init/InitGeometryJob"
import { config, state, states, workPluginName } from "engine-work-plugin-webgl1-protocol";

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case "create_gl_engine":
			return create_gl;
		case "init_webgl_extension_webgl_engine":
			return init_webgl_extension;
		case "init_geometry_webgl_engine":
			return init_geometry;
		default:
			return null
	}
}

let _init = (_state: state) => {
}

export let getWorkPluginContribute: getWorkPluginContributeMeta3D<state, config, states> = ({ mostService, webgl1Service, engineCoreService, canvas }) => {
	return {
		workPluginName: workPluginName,
		createStateFunc: () => {
			return {
				mostService,
				webgl1Service,
				engineCoreService,
				canvas,
				gl: null,
				vbo: {
					verticesVBOMap: Map<number, WebGLBuffer>(),
					indicesVBOMap: Map<number, WebGLBuffer>()
				},
				material: {
					programMap: Map<number, WebGLProgram>()
				}
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
								"name": "create_gl_engine",
								"type_": "job"
							},
							{
								"name": "init_webgl_extension_webgl_engine",
								"type_": "job"
							},
							{
								"name": "init_geometry_webgl_engine",
								"type_": "job"
							},
						]
					}
				],
				first_group: "first_webgl1_engine"
			}
		],
	}
}
