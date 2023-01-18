'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Utils$Meta3dPipelineRoot = require("./Utils.bs.js");

function execFunc(meta3dState, param) {
  var match = Utils$Meta3dPipelineRoot.getState(Curry._1(param.getStatesFunc, meta3dState));
  return Curry._1(match.mostService.callFunc, (function (param) {
                console.log("update root job exec");
                return meta3dState;
              }));
}

exports.execFunc = execFunc;
/* No side effect */
