'use strict';

var InitJob$Meta3dPipelineRootSceneview = require("./jobs/InitJob.bs.js");
var RenderJob$Meta3dPipelineRootSceneview = require("./jobs/RenderJob.bs.js");
var UpdateJob$Meta3dPipelineRootSceneview = require("./jobs/UpdateJob.bs.js");
var StateType$Meta3dPipelineRootSceneviewProtocol = require("meta3d-pipeline-root-sceneview-protocol/lib/js/src/StateType.bs.js");

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

exports._getExecFunc = _getExecFunc;
exports._init = _init;
exports.getContribute = getContribute;
/* InitJob-Meta3dPipelineRootSceneview Not a pure module */
