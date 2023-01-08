import { workPluginContribute } from "meta3d-engine-core-protocol/src/contribute/work/WorkPluginContributeType";
import { execFunc as execUpdateTransform } from "./jobs/update/UpdateTransformJob";
import { state, states, workPluginName } from "meta3d-work-plugin-transform-protocol/src/StateType";
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-work-plugin-transform-protocol/src/DependentMapType";
import { config } from "meta3d-work-plugin-transform-protocol/src/ConfigType";
import { getContribute as getContributeMeta3D } from "meta3d-type"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case "update_transform_transform_meta3d":
			return execUpdateTransform;
		default:
			return null
	}
}

let _init = (_state: state) => {
}

export let getContribute: getContributeMeta3D<dependentExtensionNameMap, dependentContributeNameMap, workPluginContribute<config, state, states>> = (api, dependentMapData) => {
	let {
		meta3dBsMostExtensionName,
		meta3dEngineCoreExtensionName
	} = dependentMapData[0]

	return {
		workPluginName: workPluginName,
		createStateFunc: (meta3dState, _) => {
			return {
				mostService: api.getExtensionService<mostService>(meta3dState, meta3dBsMostExtensionName),
				engineCoreService: api.getExtensionService<engineCoreService>(meta3dState, meta3dEngineCoreExtensionName),
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: [
			{
				name: "update",
				groups: [
					{
						name: "first_transform_meta3d",
						link: "concat",
						elements: [
							{
								"name": "update_transform_transform_meta3d",
								"type_": "job"
							},
						]
					}
				],
				first_group: "first_transform_meta3d"
			}
		],
	}
}
