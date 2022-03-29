

import * as InitJob$Meta3dWorkPluginRoot from "./jobs/InitJob.bs.js";
import * as RenderJob$Meta3dWorkPluginRoot from "./jobs/RenderJob.bs.js";
import * as UpdateJob$Meta3dWorkPluginRoot from "./jobs/UpdateJob.bs.js";
import * as Index$Meta3dWorkPluginRootProtocol from "./../../../../../node_modules/meta3d-work-plugin-root-protocol/lib/es6_global/src/Index.bs.js";

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

function getWorkPluginContribute(mostService) {
  return {
          workPluginName: Index$Meta3dWorkPluginRootProtocol.workPluginName,
          createStateFunc: (function (param) {
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

export {
  _getExecFunc ,
  _init ,
  getWorkPluginContribute ,
  
}
/* No side effect */
