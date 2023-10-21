

import * as InitJob$Meta3dPipelineRootSceneview from "./jobs/InitJob.bs.js";
import * as RenderJob$Meta3dPipelineRootSceneview from "./jobs/RenderJob.bs.js";
import * as UpdateJob$Meta3dPipelineRootSceneview from "./jobs/UpdateJob.bs.js";
import * as StateType$Meta3dPipelineRootSceneviewProtocol from "../../../../../node_modules/meta3d-pipeline-root-sceneview-protocol/lib/es6_global/src/StateType.bs.js";

function _getExecFunc(_pipelineName, jobName) {
  if (jobName === StateType$Meta3dPipelineRootSceneviewProtocol.job.Init) {
    return InitJob$Meta3dPipelineRootSceneview.execFunc;
  } else if (jobName === StateType$Meta3dPipelineRootSceneviewProtocol.job.Update) {
    return UpdateJob$Meta3dPipelineRootSceneview.execFunc;
  } else if (jobName === StateType$Meta3dPipelineRootSceneviewProtocol.job.Render) {
    return RenderJob$Meta3dPipelineRootSceneview.execFunc;
  } else {
    return null;
  }
}

function _init(_state) {
  
}

function getContribute(api) {
  return {
          pipelineName: StateType$Meta3dPipelineRootSceneviewProtocol.pipelineName,
          createStateFunc: (function (meta3dState, param) {
              var mostService = api.getExtensionService(meta3dState, "meta3d-bs-most-protocol");
              return {
                      mostService: mostService
                    };
            }),
          initFunc: _init,
          getExecFunc: _getExecFunc,
          allPipelineData: StateType$Meta3dPipelineRootSceneviewProtocol.allPipelineData,
          restoreFunc: null,
          deepCopyFunc: null
        };
}

export {
  _getExecFunc ,
  _init ,
  getContribute ,
}
/* InitJob-Meta3dPipelineRootSceneview Not a pure module */
