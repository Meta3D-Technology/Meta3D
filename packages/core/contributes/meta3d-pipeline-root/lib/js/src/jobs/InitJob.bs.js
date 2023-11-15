'use strict';

var Utils$Meta3dPipelineRoot = require("./Utils.bs.js");

function execFunc(meta3dState, param) {
  var match = Utils$Meta3dPipelineRoot.getState(param.getStatesFunc(meta3dState));
  return match.mostService.callFunc(function (param) {
              console.log("init root job exec");
              return meta3dState;
            });
}

exports.execFunc = execFunc;
/* Utils-Meta3dPipelineRoot Not a pure module */
