'use strict';

var InitJob$Meta3dPipelineRoot = require("./jobs/InitJob.bs.js");
var RenderJob$Meta3dPipelineRoot = require("./jobs/RenderJob.bs.js");
var UpdateJob$Meta3dPipelineRoot = require("./jobs/UpdateJob.bs.js");
var StateType$Meta3dPipelineRootProtocol = require("meta3d-pipeline-root-protocol/lib/js/src/StateType.bs.js");

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

exports._getExecFunc = _getExecFunc;
exports._init = _init;
exports.getContribute = getContribute;
/* InitJob-Meta3dPipelineRoot Not a pure module */
