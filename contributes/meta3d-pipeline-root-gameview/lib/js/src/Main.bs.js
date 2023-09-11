'use strict';

var InitJob$Meta3dPipelineRootGameview = require("./jobs/InitJob.bs.js");
var RenderJob$Meta3dPipelineRootGameview = require("./jobs/RenderJob.bs.js");
var UpdateJob$Meta3dPipelineRootGameview = require("./jobs/UpdateJob.bs.js");
var StateType$Meta3dPipelineRootGameviewProtocol = require("meta3d-pipeline-root-gameview-protocol/lib/js/src/StateType.bs.js");

function _getExecFunc(_pipelineName, jobName) {
  if (jobName === StateType$Meta3dPipelineRootGameviewProtocol.job.Init) {
    return InitJob$Meta3dPipelineRootGameview.execFunc;
  } else if (jobName === StateType$Meta3dPipelineRootGameviewProtocol.job.Update) {
    return UpdateJob$Meta3dPipelineRootGameview.execFunc;
  } else if (jobName === StateType$Meta3dPipelineRootGameviewProtocol.job.Render) {
    return RenderJob$Meta3dPipelineRootGameview.execFunc;
  } else {
    return null;
  }
}

function _init(_state) {
  
}

function getContribute(api) {
  return {
          pipelineName: StateType$Meta3dPipelineRootGameviewProtocol.pipelineName,
          createStateFunc: (function (meta3dState, param) {
              var mostService = api.getExtensionService(meta3dState, "meta3d-bs-most-protocol");
              return {
                      mostService: mostService
                    };
            }),
          initFunc: _init,
          getExecFunc: _getExecFunc,
          allPipelineData: StateType$Meta3dPipelineRootGameviewProtocol.allPipelineData
        };
}

exports._getExecFunc = _getExecFunc;
exports._init = _init;
exports.getContribute = getContribute;
/* InitJob-Meta3dPipelineRootGameview Not a pure module */
