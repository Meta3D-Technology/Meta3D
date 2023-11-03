'use strict';

var Utils$Meta3dPipelineRootGameview = require("./Utils.bs.js");

function execFunc(meta3dState, param) {
  var match = Utils$Meta3dPipelineRootGameview.getState(param.getStatesFunc(meta3dState));
  return match.mostService.callFunc(function (param) {
              console.log("update root job exec");
              return meta3dState;
            });
}

exports.execFunc = execFunc;
/* Utils-Meta3dPipelineRootGameview Not a pure module */
