import { getWorkPluginContribute as getWorkPluginContributeMeta3D } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType";
import { execFunc as execInitMaterial } from "./jobs/init/InitMaterialJob";
import { config, state, states, workPluginName } from "meta3d-work-plugin-webgl1-material-protocol";

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case "init_material_webgl1_material_meta3d":
			return execInitMaterial;
		default:
			return null
	}
}

let _init = (_state: state) => {
}

export let getWorkPluginContribute: getWorkPluginContributeMeta3D<state, config, states> = ({ mostService,
	webgl1Service,
	engineCoreService,
	immutableService,
	workPluginWhichHasAllMaterialIndicesName,
}) => {
	return {
		workPluginName: workPluginName,
		createStateFunc: () => {
			return {
				mostService,
				webgl1Service,
				engineCoreService,
				immutableService,
				workPluginWhichHasAllMaterialIndicesName,
				material: {
					programMap: immutableService.createMap(),
				},
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: [
			{
				name: "init",
				groups: [
					{
						name: "first_webgl1_material_meta3d",
						link: "concat",
						elements: [
							{
								"name": "init_material_webgl1_material_meta3d",
								"type_": "job"
							},
						]
					}
				],
				first_group: "first_webgl1_material_meta3d"
			}
		],
	}
}
