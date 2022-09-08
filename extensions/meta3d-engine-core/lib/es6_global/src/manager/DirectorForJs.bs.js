

import * as Result$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Result.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as Exception$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as PluginDataManager$Meta3dEngineCore from "./work_manager/plugin_data/PluginDataManager.bs.js";
import * as WorkPluginManager$Meta3dEngineCore from "./work_manager/WorkPluginManager.bs.js";

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

export {
  _convertJobOrders ,
  registerWorkPlugin ,
  unregisterWorkPlugin ,
  prepare ,
  init ,
  runPipeline ,
  getIsDebug ,
  setIsDebug ,
  
}
/* No side effect */
