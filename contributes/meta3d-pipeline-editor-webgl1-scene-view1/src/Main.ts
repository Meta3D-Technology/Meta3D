import { pipelineContribute } from "meta3d-engine-core-sceneview-protocol/src/contribute/work/PipelineContributeType";
import { execFunc as execInitArcballCameraControllerJob } from "./jobs/init/InitArcballCameraControllerJob";
import { execFunc as execCreateDefaultSceneJob } from "./jobs/init/CreateDefaultSceneJob";
import { execFunc as execPrepareFBO } from "./jobs/update/PrepareFBOJob";
import { execFunc as execUpdateArcballCameraControllerJob } from "./jobs/update/UpdateArcballCameraControllerJob";
import { execFunc as execPrepareStatus } from "./jobs/render/PrepareStatusJob";
import { execFunc as execUseFBO } from "./jobs/render/UseFBOJob";
import { config } from "meta3d-pipeline-editor-webgl1-scene-view1-protocol/src/ConfigType";
import { state, states, pipelineName, allPipelineData, job } from "meta3d-pipeline-editor-webgl1-scene-view1-protocol/src/StateType";
import { getContribute as getContributeMeta3D } from "meta3d-type"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { service as engineWholeService } from "meta3d-engine-whole-sceneview-protocol/src/service/ServiceType"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case job.InitArcballCameraController:
			return execInitArcballCameraControllerJob;
		case job.CreateDefaultScene:
			return execCreateDefaultSceneJob;
		case job.PrepareFBO:
			return execPrepareFBO;
		case job.UpdateArcballCameraController:
			return execUpdateArcballCameraControllerJob;
		case job.PrepareStatus:
			return execPrepareStatus;
		case job.UseFBO:
			return execUseFBO;
		default:
			return null
	}
}

let _init = (_state: state) => {
}

export let getContribute: getContributeMeta3D<pipelineContribute<config, state>> = (api) => {
	return {
		pipelineName: pipelineName,
		createStateFunc: (meta3dState, { canvas }) => {
			return {
				mostService: api.getExtensionService<mostService>(meta3dState, "meta3d-bs-most-protocol"),
				webgl1Service: api.getExtensionService<webgl1Service>(meta3dState, "meta3d-webgl1-protocol"),
				uiService: api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol"),
				eventService: api.getExtensionService<eventService>(meta3dState, "meta3d-event-protocol"),
				engineWholeService: api.getExtensionService<engineWholeService>(meta3dState, "meta3d-engine-whole-sceneview-protocol"),

				canvas: canvas,
				// arcballCameraController: null,
				lastYaw: null,
				lastPitch: null,
				fbo: null
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: allPipelineData,
	}
}
