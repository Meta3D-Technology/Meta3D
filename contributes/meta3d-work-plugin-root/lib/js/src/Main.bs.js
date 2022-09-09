'use strict';

var InitJob$Meta3dWorkPluginRoot = require("./jobs/InitJob.bs.js");
var RenderJob$Meta3dWorkPluginRoot = require("./jobs/RenderJob.bs.js");
var UpdateJob$Meta3dWorkPluginRoot = require("./jobs/UpdateJob.bs.js");
var StateType$Meta3dWorkPluginRootProtocol = require("meta3d-work-plugin-root-protocol/lib/js/src/StateType.bs.js");

function _getExecFunc(_pipelineName, jobName) {
  switch (jobName) {
    case "init_root_meta3d" :
        return InitJob$Meta3dWorkPluginRoot.execFunc;
    case "render_root_meta3d" :
        return RenderJob$Meta3dWorkPluginRoot.execFunc;
    case "update_root_meta3d" :
        return UpdateJob$Meta3dWorkPluginRoot.execFunc;
    default:
      return null;
  }
}

function _init(_state) {
  
}

function getContribute(api, param) {
  var meta3dBsMostExtensionName = param[0].meta3dBsMostExtensionName;
  return {
          workPluginName: StateType$Meta3dWorkPluginRootProtocol.workPluginName,
          createStateFunc: (function (meta3dState) {
              var mostService = api.getExtensionService(meta3dState, meta3dBsMostExtensionName);
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
