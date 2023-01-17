import { workPluginContribute } from "meta3d-engine-core-protocol/src/contribute/work/WorkPluginContributeType";
import { execFunc as execUpdateCamera } from "./jobs/update/UpdateCameraJob";
import { state, states, workPluginName } from "meta3d-work-plugin-camera-protocol/src/StateType";
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-work-plugin-camera-protocol/src/DependentMapType";
import { config } from "meta3d-work-plugin-camera-protocol/src/ConfigType";
import { getContribute as getContributeMeta3D } from "meta3d-type"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case "update_camera_camera_meta3d":
			return execUpdateCamera;
		default:
			return null
	}
}

let _init = (_state: state) => {
}

export let getContribute: getContributeMeta3D<dependentExtensionNameMap, dependentContributeNameMap, workPluginContribute<config, state, states>> = (api, dependentMapData) => {
	let {
		meta3dBsMostExtensionName,
		meta3dEngineCoreExtensionName,
		meta3dUIExtensionName
	} = dependentMapData[0]

	return {
		workPluginName: workPluginName,
		createStateFunc: (meta3dState, { isDebug }) => {
			return {
				mostService: api.getExtensionService<mostService>(meta3dState, meta3dBsMostExtensionName),
				engineCoreService: api.getExtensionService<engineCoreService>(meta3dState, meta3dEngineCoreExtensionName),
				meta3dUIExtensionProtocolName: meta3dUIExtensionName,
				isDebug
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: [
			{
				name: "update",
				groups: [
					{
						name: "first_camera_meta3d",
						link: "concat",
						elements: [
							{
								"name": "update_camera_camera_meta3d",
								"type_": "job"
							},
						]
					}
				],
				first_group: "first_camera_meta3d"
			}
		],
	}
}
