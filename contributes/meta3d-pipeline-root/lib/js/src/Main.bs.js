'use strict';

var InitJob$Meta3dPipelineRoot = require("./jobs/InitJob.bs.js");
var RenderJob$Meta3dPipelineRoot = require("./jobs/RenderJob.bs.js");
var UpdateJob$Meta3dPipelineRoot = require("./jobs/UpdateJob.bs.js");
var StateType$Meta3dPipelineRootProtocol = require("meta3d-pipeline-root-protocol/lib/js/src/StateType.bs.js");

function _getExecFunc(_pipelineName, jobName) {
  switch (jobName) {
    case "init_root_meta3d" :
        return InitJob$Meta3dPipelineRoot.execFunc;
    case "render_root_meta3d" :
        return RenderJob$Meta3dPipelineRoot.execFunc;
    case "update_root_meta3d" :
        return UpdateJob$Meta3dPipelineRoot.execFunc;
    default:
      return null;
  }
}

function _init(_state) {
  
}

function getContribute(api, param) {
  var meta3dBsMostExtensionProtocolName = param[0].meta3dBsMostExtensionProtocolName;
  return {
          pipelineName: StateType$Meta3dPipelineRootProtocol.pipelineName,
          createStateFunc: (function (meta3dState, param) {
              var mostService = api.getExtensionService(meta3dState, meta3dBsMostExtensionProtocolName);
              return {
                      mostService: mostService
                    };
            }),
          initFunc: _init,
          getExecFunc: _getExecFunc,
          allPipelineData: [
            {
              name: "init",
              groups: [{
                  name: "first_root_meta3d",
                  link: "concat",
                  elements: [{
                      name: "init_root_meta3d",
                      type_: "job",
                      is_set_state: true
                    }]
                }],
              first_group: "first_root_meta3d"
            },
            {
              name: "update",
              groups: [{
                  name: "first_root_meta3d",
                  link: "concat",
                  elements: [{
                      name: "update_root_meta3d",
                      type_: "job",
                      is_set_state: true
                    }]
                }],
              first_group: "first_root_meta3d"
            },
            {
              name: "render",
              groups: [{
                  name: "first_root_meta3d",
                  link: "concat",
                  elements: [{
                      name: "render_root_meta3d",
                      type_: "job",
                      is_set_state: true
                    }]
                }],
              first_group: "first_root_meta3d"
            }
          ]
        };
}

exports._getExecFunc = _getExecFunc;
exports._init = _init;
exports.getContribute = getContribute;
/* No side effect */
