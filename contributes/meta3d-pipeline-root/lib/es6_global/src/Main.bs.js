

import * as InitJob$Meta3dPipelineRoot from "./jobs/InitJob.bs.js";
import * as RenderJob$Meta3dPipelineRoot from "./jobs/RenderJob.bs.js";
import * as UpdateJob$Meta3dPipelineRoot from "./jobs/UpdateJob.bs.js";
import * as StateType$Meta3dPipelineRootProtocol from "./../../../../../node_modules/meta3d-pipeline-root-protocol/lib/es6_global/src/StateType.bs.js";

function _getExecFunc(_pipelineName, jobName) {
  if (jobName === StateType$Meta3dPipelineRootProtocol.job.Init) {
    return InitJob$Meta3dPipelineRoot.execFunc;
  } else if (jobName === StateType$Meta3dPipelineRootProtocol.job.Update) {
    return UpdateJob$Meta3dPipelineRoot.execFunc;
  } else if (jobName === StateType$Meta3dPipelineRootProtocol.job.Render) {
    return RenderJob$Meta3dPipelineRoot.execFunc;
  } else {
    return null;
  }
}

function _init(_state) {
  
}

function getContribute(api) {
  return {
          pipelineName: StateType$Meta3dPipelineRootProtocol.pipelineName,
          createStateFunc: (function (meta3dState, param) {
              var mostService = api.getExtensionService(meta3dState, "meta3d-bs-most-protocol");
              return {
                      mostService: mostService
                    };
            }),
          initFunc: _init,
          getExecFunc: _getExecFunc,
          allPipelineData: StateType$Meta3dPipelineRootProtocol.allPipelineData
        };
}

export {
  _getExecFunc ,
  _init ,
  getContribute ,
}
/* InitJob-Meta3dPipelineRoot Not a pure module */
