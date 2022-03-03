

import * as InitJob$Meta3dWorkPluginRoot from "./jobs/InitJob.bs.js";
import * as Index$Meta3dWorkPluginRootProtocol from "./../../../../../node_modules/meta3d-work-plugin-root-protocol/lib/es6_global/src/Index.bs.js";

function _getExecFunc(_pipelineName, jobName) {
  if (jobName === "init_root_meta3d") {
    return InitJob$Meta3dWorkPluginRoot.execFunc;
  } else {
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
          allPipelineData: [{
              name: "init",
              groups: [{
                  name: "first_root_meta3d",
                  link: "concat",
                  elements: [{
                      name: "init_root_meta3d",
                      type_: "job"
                    }]
                }],
              first_group: "first_root_meta3d"
            }]
        };
}

export {
  _getExecFunc ,
  _init ,
  getWorkPluginContribute ,
  
}
/* No side effect */
