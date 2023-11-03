'use strict';

var Utils$Meta3dPipelineRootSceneview = require("./Utils.bs.js");

function execFunc(meta3dState, param) {
  var match = Utils$Meta3dPipelineRootSceneview.getState(param.getStatesFunc(meta3dState));
  return match.mostService.callFunc(function (param) {
              console.log("render root job exec");
              return meta3dState;
            });
}

exports.execFunc = execFunc;
/* Utils-Meta3dPipelineRootSceneview Not a pure module */
