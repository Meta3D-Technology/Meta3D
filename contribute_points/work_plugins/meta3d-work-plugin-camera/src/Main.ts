import { getWorkPluginContribute as getWorkPluginContributeMeta3D } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType";
import { execFunc as execUpdateCamera } from "./jobs/update/UpdateCameraJob";
import { config, state, states, workPluginName } from "meta3d-work-plugin-camera-protocol";

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

export let getWorkPluginContribute: getWorkPluginContributeMeta3D<state, config, states> = ({
	isDebug,
	mostService,
	engineCoreService,
	workPluginWhichHasCanvasName,
}) => {
	return {
		workPluginName: workPluginName,
		createStateFunc: () => {
			return {
				isDebug,
				mostService,
				engineCoreService,
				workPluginWhichHasCanvasName
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
