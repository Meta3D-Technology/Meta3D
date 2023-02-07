import { pipelineContribute } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType";
import { execFunc as execDetectGL } from "./jobs/init/DetectGLJob";
import { dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap } from "./DependentMapType";
import { config } from "meta3d-pipeline-webgl1-detectgl-protocol/src/ConfigType";
import { state, states, pipelineName } from "meta3d-pipeline-webgl1-detectgl-protocol/src/StateType";
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

export let getContribute: getContributeMeta3D<dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap, pipelineContribute<config, state>> = (api, dependentMapData) => {
	let {
		meta3dWebgl1ExtensionProtocolName,
		meta3dBsMostExtensionProtocolName
	} = dependentMapData[0]

	return {
		pipelineName: pipelineName,
		createStateFunc: (meta3dState, _) => {
			return {
				mostService: api.getExtensionService<mostService>(meta3dState, meta3dBsMostExtensionProtocolName),
				webgl1Service: api.getExtensionService<webgl1Service>(meta3dState, meta3dWebgl1ExtensionProtocolName),
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
