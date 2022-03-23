'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Utils$Meta3dWorkPluginRoot = require("./Utils.bs.js");

function execFunc(state, param) {
  var match = Utils$Meta3dWorkPluginRoot.getState(Curry._1(param.getStatesFunc, state));
  return Curry._1(match.mostService.callFunc, (function (param) {
                console.log("init root job exec");
                return state;
              }));
}

exports.execFunc = execFunc;
/* No side effect */
