import { getWorkPluginContribute as getWorkPluginContributeMeta3D } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType";
import { execFunc as init_webgl_extension } from "./jobs/init/InitWebGLExtensionJob"
import { execFunc as init_geometry } from "./jobs/init/InitGeometryJob"
import { execFunc as init_material } from "./jobs/init/InitMaterialJob"
import { execFunc as updateCamera } from "./jobs/update/UpdateCameraJob";
import { execFunc as updateTransform } from "./jobs/update/UpdateTransformJob";
import { execFunc as sendCameraData } from "./jobs/render/SendUniformShaderDataJob";
import { execFunc as render } from "./jobs/render/RenderJob";
import { config, state, states, workPluginName } from "engine-work-plugin-webgl1-protocol";

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case "init_webgl_extension_webgl_engine":
			return init_webgl_extension;
		case "init_geometry_webgl_engine":
			return init_geometry;
		case "init_material_webgl_engine":
			return init_material;
		case "update_camera_webgl_engine":
			return updateCamera;
		case "update_transform_webgl_engine":
			return updateTransform;
		case "send_uniform_shader_data_webgl_engine":
			return sendCameraData;
		case "render_webgl_engine":
			return render;
		default:
			return null
	}
}

let _init = (_state: state) => {
}

export let getWorkPluginContribute: getWorkPluginContributeMeta3D<state, config, states> = ({ isDebug, mostService, webgl1Service, engineCoreService, immutableService, canvas }) => {
	return {
		workPluginName: workPluginName,
		createStateFunc: () => {
			return {
				isDebug,
				mostService,
				webgl1Service,
				engineCoreService,
				immutableService,
				canvas,
				vbo: {
					verticesVBOMap: immutableService.createMap(),
					indicesVBOMap: immutableService.createMap(),
				},
				material: {
					programMap: immutableService.createMap()
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
								"name": "init_webgl_extension_webgl_engine",
								"type_": "job"
							},
							{
								"name": "init_geometry_webgl_engine",
								"type_": "job"
							},
							{
								"name": "init_material_webgl_engine",
								"type_": "job"
							},
						]
					}
				],
				first_group: "first_webgl1_engine"
			},
			{
				name: "update",
				groups: [
					{
						name: "first_webgl_engine",
						link: "concat",
						elements: [
							{
								"name": "update_camera_webgl_engine",
								"type_": "job"
							},
							{
								"name": "update_transform_webgl_engine",
								"type_": "job"
							}
						]
					}
				],
				first_group: "first_webgl_engine"
			},
			{
				name: "render",
				groups: [
					{
						name: "first_webgl_engine",
						link: "concat",
						elements: [
							{
								"name": "send_uniform_shader_data_webgl_engine",
								"type_": "job"
							},
							{
								"name": "render_webgl_engine",
								"type_": "job"
							},
						]
					}
				],
				first_group: "first_webgl_engine"
			}
		],
	}
}
