'use strict';

var Result$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Result.bs.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");
var PluginDataManager$Meta3dEngineCore = require("./work_manager/plugin_data/PluginDataManager.bs.js");
var WorkPluginManager$Meta3dEngineCore = require("./work_manager/WorkPluginManager.bs.js");

function _convertJobOrders(jobOrders) {
  return ArraySt$Meta3dCommonlib.map(jobOrders, (function (jobOrder) {
                return {
                        pipelineName: jobOrder.pipelineName,
                        insertElementName: jobOrder.insertElementName,
                        insertAction: jobOrder.insertAction === "after" ? /* After */1 : /* Before */0
                      };
              }));
}

function registerWorkPlugin(state, contribute, jobOrdersOpt, param) {
  var jobOrders = jobOrdersOpt !== undefined ? jobOrdersOpt : [];
  return WorkPluginManager$Meta3dEngineCore.registerPlugin(state, contribute, _convertJobOrders(jobOrders));
}

function prepare(param) {
  
}

var init = WorkPluginManager$Meta3dEngineCore.init;

function runPipeline(param, state, meta3dState, pipelineName) {
  var mostService = param[0].getExtensionService(meta3dState, param[1].meta3dBsMostExtensionName);
  return Result$Meta3dCommonlib.handleFail(WorkPluginManager$Meta3dEngineCore.runPipeline(state, mostService, pipelineName), Exception$Meta3dCommonlib.throwErr);
}

var unregisterWorkPlugin = WorkPluginManager$Meta3dEngineCore.unregisterPlugin;

var getIsDebug = PluginDataManager$Meta3dEngineCore.getIsDebug;

var setIsDebug = PluginDataManager$Meta3dEngineCore.setIsDebug;

exports._convertJobOrders = _convertJobOrders;
exports.registerWorkPlugin = registerWorkPlugin;
exports.unregisterWorkPlugin = unregisterWorkPlugin;
exports.prepare = prepare;
exports.init = init;
exports.runPipeline = runPipeline;
exports.getIsDebug = getIsDebug;
exports.setIsDebug = setIsDebug;
/* No side effect */
