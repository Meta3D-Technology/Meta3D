import { pipelineContribute } from "meta3d-core-protocol/src/service/ServiceType";
import { execFunc as execUpdateCamera } from "./jobs/update/UpdateCameraJob";
import { state, states, pipelineName, allPipelineData, job } from "meta3d-pipeline-camera-protocol/src/StateType";
import { config } from "meta3d-pipeline-camera-protocol/src/ConfigType";
import { getContribute as getContributeMeta3D } from "meta3d-type"
import { service as coreService } from "meta3d-core-protocol/src/service/ServiceType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case job.UpdateCamera:
			return execUpdateCamera;
		default:
			return null
	}
}

let _init = (_state: state) => {
}

export let getContribute: getContributeMeta3D<pipelineContribute<config, state>> = (api) => {
	return {
		pipelineName: pipelineName,
		createStateFunc: (meta3dState, { isDebug }) => {
			return {
				mostService: getExn(api.getPackageService<coreService>(meta3dState, "meta3d-core-protocol")).most(meta3dState),
				engineCoreService: getExn(api.getPackageService<coreService>(meta3dState, "meta3d-core-protocol")).engineCore(meta3dState),
				isDebug
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: allPipelineData,
	}
}
