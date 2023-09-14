import { pipelineContribute } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType";
import { execFunc as execPrepareUpdateDataJob } from "./jobs/update/PrepareUpdateDataJob"
import { execFunc as execPrepareRenderDataJob } from "./jobs/render/PrepareRenderDataJob"
import { config } from "meta3d-pipeline-webgl1-data-protocol/src/ConfigType";
import { state, states, pipelineName, allPipelineData, job } from "meta3d-pipeline-webgl1-data-protocol/src/StateType";
import { getContribute as getContributeMeta3D } from "meta3d-type"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { map } from "meta3d-commonlib-ts/src/NullableUtils";


let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case job.PrepareUpdateData:
			return execPrepareUpdateDataJob
		case job.PrepareRenderData:
			return execPrepareRenderDataJob
		default:
			return null
	}
}

let _init = (_state: state) => {
}

export let getContribute: getContributeMeta3D<pipelineContribute<config, state>> = (api) => {
	return {
		pipelineName: pipelineName,
		createStateFunc: (meta3dState, {
			isDebug,
		}) => {
			return {
				isDebug,
				mostService: api.getExtensionService<mostService>(meta3dState, "meta3d-bs-most-protocol"),
				engineCoreService: api.getExtensionService<engineCoreService>(meta3dState, "meta3d-engine-core-protocol"),
				gl: null,
				allGeometryIndices: [],
				allMaterialIndices: [],
				viewMatrix: null,
				pMatrix: null,
				allRenderComponents: []
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: allPipelineData,
		deepCopyFunc: (state) => {
			return {
				...state,
				allGeometryIndices: state.allGeometryIndices.slice(),
				allMaterialIndices: state.allMaterialIndices.slice(),
				viewMatrix: map((viewMatrix) => viewMatrix.slice(), state.viewMatrix),
				pMatrix: map((pMatrix) => pMatrix.slice(), state.pMatrix),
				allRenderComponents: state.allRenderComponents.slice()
			}
		}
	}
}
