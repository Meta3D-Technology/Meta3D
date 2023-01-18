import { workPluginContribute } from "meta3d-engine-core-protocol/src/contribute/work/WorkPluginContributeType";
import { execFunc as execDetectGL } from "./jobs/init/DetectGLJob";
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-work-plugin-webgl1-detectgl-protocol/src/DependentMapType";
import { config } from "meta3d-work-plugin-webgl1-detectgl-protocol/src/ConfigType";
import { state, states, workPluginName } from "meta3d-work-plugin-webgl1-detectgl-protocol/src/StateType";
import { getContribute as getContributeMeta3D } from "meta3d-type"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"

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

export let getContribute: getContributeMeta3D<dependentExtensionNameMap, dependentContributeNameMap, workPluginContribute<config, state>> = (api, dependentMapData) => {
	let {
		meta3dWebgl1ExtensionName,
		meta3dBsMostExtensionName
	} = dependentMapData[0]

	return {
		workPluginName: workPluginName,
		createStateFunc: (meta3dState, _) => {
			return {
				mostService: api.getExtensionService<mostService>(meta3dState, meta3dBsMostExtensionName),
				webgl1Service: api.getExtensionService<webgl1Service>(meta3dState, meta3dWebgl1ExtensionName),
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
