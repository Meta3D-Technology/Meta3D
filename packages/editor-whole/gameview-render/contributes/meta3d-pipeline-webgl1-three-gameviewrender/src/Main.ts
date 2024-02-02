import { pipelineContribute } from "meta3d-core-protocol/src/service/ServiceType";
import { execFunc as execInitArcballCameraController } from "./jobs/init/InitArcballCameraControllerJob";
import { execFunc as execCreateDefaultScene } from "./jobs/init/CreateDefaultSceneJob";
import { execFunc as execUpdateScript } from "./jobs/update/UpdateScriptJob";
import { execFunc as execUpdateCameraAspect } from "./jobs/render/UpdateCameraAspectJob"
import { execFunc as execUpdateArcballCameraController } from "./jobs/render/UpdateArcballCameraControllerJob";
import { execFunc as execInit } from "./jobs/init/InitJob";
import { execFunc as execConvertSceneGraph } from "./jobs/render/ConvertSceneGraphJob";
import { execFunc as execRender } from "./jobs/render/RenderJob";
import { execFunc as execReset } from "./jobs/render/ResetJob";
import { execFunc as execBindEventOnce } from "./jobs/render/BindEventOnceJob";
import { execFunc as execHandlePipelineStatus } from "./jobs/render/HandlePipelineStatusJob";
import { state, states, pipelineName, allPipelineData, job } from "meta3d-pipeline-webgl1-three-gameviewrender-protocol/src/StateType";
import { config } from "meta3d-pipeline-webgl1-three-gameviewrender-protocol/src/ConfigType";
import { getContribute as getContributeMeta3D } from "meta3d-type"
import { service as coreService } from "meta3d-core-protocol/src/service/ServiceType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { service as threeService } from "meta3d-three-protocol/src/service/ServiceType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case job.ConvertSceneGraph:
			return execConvertSceneGraph;
		case job.Init:
			return execInit;
		case job.Render:
			return execRender;
		case job.InitArcballCameraController:
			return execInitArcballCameraController
		case job.CreateDefaultScene:
			return execCreateDefaultScene
		case job.UpdateScript:
			return execUpdateScript
		case job.UpdateCameraAspect:
			return execUpdateCameraAspect
		case job.UpdateArcballCameraController:
			return execUpdateArcballCameraController
		case job.Reset:
			return execReset
		case job.BindEventOnce:
			return execBindEventOnce
		case job.HandlePipelineStatus:
			return execHandlePipelineStatus
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
				mostService: getExn(api.getPackageService<coreService>(meta3dState, "meta3d-core-protocol")).most(meta3dState),
				uiService: getExn(api.getPackageService<uiService>(meta3dState, "meta3d-ui-protocol")),
				eventService: getExn(api.getPackageService<eventService>(meta3dState, "meta3d-event-protocol")),
				converterService: getExn(api.getPackageService<threeService>(meta3dState, "meta3d-three-protocol")).converter(meta3dState),
				threeAPIService: getExn(api.getPackageService<threeService>(meta3dState, "meta3d-three-protocol")).api(meta3dState),

				renderer: null,
				composer: null,
				renderPass: null,
				canvas,
				lastYaw: null,
				lastPitch: null,
				isBinded: false
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: allPipelineData,
	}
}
