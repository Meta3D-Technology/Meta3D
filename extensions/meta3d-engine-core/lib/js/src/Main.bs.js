'use strict';

var CreateState$Meta3dEngineCore = require("./state/CreateState.bs.js");
var DirectorForJs$Meta3dEngineCore = require("./manager/DirectorForJs.bs.js");

function getExtensionService(api, param) {
  var partial_arg_1 = param[0];
  var partial_arg = [
    api,
    partial_arg_1
  ];
  return {
          getIsDebug: DirectorForJs$Meta3dEngineCore.getIsDebug,
          setIsDebug: DirectorForJs$Meta3dEngineCore.setIsDebug,
          prepare: DirectorForJs$Meta3dEngineCore.prepare,
          init: DirectorForJs$Meta3dEngineCore.init,
          registerWorkPlugin: DirectorForJs$Meta3dEngineCore.registerWorkPlugin,
          unregisterWorkPlugin: DirectorForJs$Meta3dEngineCore.unregisterWorkPlugin,
          runPipeline: (function (param, param$1, param$2) {
              return DirectorForJs$Meta3dEngineCore.runPipeline(partial_arg, param, param$1, param$2);
            })
        };
}

function createExtensionState(param) {
  return CreateState$Meta3dEngineCore.createState(undefined);
}

function getExtensionLife(param, param$1) {
  return {
          onRegister: null,
          onStart: null
        };
}

exports.getExtensionService = getExtensionService;
exports.createExtensionState = createExtensionState;
exports.getExtensionLife = getExtensionLife;
/* No side effect */
