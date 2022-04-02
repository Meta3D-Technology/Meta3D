import { getWorkPluginContribute as getWorkPluginContributeMeta3D } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType";
import { execFunc as execUpdateTransform } from "./jobs/update/UpdateTransformJob";
import { config, state, states, workPluginName } from "meta3d-work-plugin-transform-protocol";

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

export let getWorkPluginContribute: getWorkPluginContributeMeta3D<state, config, states> = ({
	mostService,
	engineCoreService,
	transformData,
}) => {
	return {
		workPluginName: workPluginName,
		createStateFunc: () => {
			return {
				mostService,
				engineCoreService,
				transformData,
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
