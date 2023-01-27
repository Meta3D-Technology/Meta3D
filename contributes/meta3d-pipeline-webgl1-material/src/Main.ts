import { pipelineContribute } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType";
import { execFunc as execInitMaterial } from "./jobs/update/InitMaterialJob";
import { dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap } from "meta3d-pipeline-webgl1-material-protocol/src/DependentMapType";
import { config } from "meta3d-pipeline-webgl1-material-protocol/src/ConfigType";
import { state, states, pipelineName } from "meta3d-pipeline-webgl1-material-protocol/src/StateType";
import { getContribute as getContributeMeta3D } from "meta3d-type"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { service as immutableService } from "meta3d-immutable-protocol/src/service/ServiceType"

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

export let getContribute: getContributeMeta3D<dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap, pipelineContribute<config, state>> = (api, dependentMapData) => {
	let {
		meta3dWebgl1ExtensionProtocolName,
		meta3dBsMostExtensionProtocolName,
		meta3dEngineCoreExtensionProtocolName,
		meta3dImmutableExtensionProtocolName
	} = dependentMapData[0]

	return {
		pipelineName: pipelineName,
		createStateFunc: (meta3dState, _) => {
			let immutableService = api.getExtensionService<immutableService>(meta3dState, meta3dImmutableExtensionProtocolName)

			return {
				mostService: api.getExtensionService<mostService>(meta3dState, meta3dBsMostExtensionProtocolName),
				webgl1Service: api.getExtensionService<webgl1Service>(meta3dState, meta3dWebgl1ExtensionProtocolName),
				engineCoreService: api.getExtensionService<engineCoreService>(meta3dState, meta3dEngineCoreExtensionProtocolName),
				immutableService: immutableService,

				material: {
					programMap: immutableService.createMap(),
				},
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: [
			{
				name: "update",
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
