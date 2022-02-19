'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Utils$Meta3dWorkPluginRoot = require("./Utils.bs.js");

function exec(states) {
  var match = Utils$Meta3dWorkPluginRoot.getState(states);
  return Curry._1(match.mostService.callFunc, (function (param) {
                console.log("init root job exec");
                return states;
              }));
}

exports.exec = exec;
/* No side effect */
