import { getWorkPluginContribute as getWorkPluginContributeMeta3D } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType";
import { execFunc as execInitGeometry } from "./jobs/init/InitGeometryJob";
import { config, state, states, workPluginName } from "meta3d-work-plugin-webgl1-geometry-protocol";

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case "init_geometry_webgl1_geometry_meta3d":
			return execInitGeometry;
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
	workPluginWhichHasAllGeometryIndicesName,
	geometryData
}) => {
	return {
		workPluginName: workPluginName,
		createStateFunc: () => {
			return {
				mostService,
				webgl1Service,
				engineCoreService,
				immutableService,
				workPluginWhichHasAllGeometryIndicesName,
				geometryData,
				vbo: {
					verticesVBOMap: immutableService.createMap(),
					indicesVBOMap: immutableService.createMap(),
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
						name: "first_webgl1_geometry_meta3d",
						link: "concat",
						elements: [
							{
								"name": "init_geometry_webgl1_geometry_meta3d",
								"type_": "job"
							},
						]
					}
				],
				first_group: "first_webgl1_geometry_meta3d"
			}
		],
	}
}
