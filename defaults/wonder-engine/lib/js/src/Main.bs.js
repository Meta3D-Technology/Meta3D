'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Main$Meta3d = require("meta3d/lib/js/src/Main.bs.js");
var Main$Meta3dBsMost = require("meta3d-bs-most/lib/js/src/Main.bs.js");
var Main$Meta3dEngineCore = require("meta3d-engine-core/lib/js/src/Main.bs.js");
var Main$Meta3dWorkPluginRoot = require("meta3d-work-plugin-root/lib/js/src/Main.bs.js");

function _getMeta3DEngineCoreExtensionName(param) {
  return "meta3d-engine-core";
}

function _getMeta3DBsMostExtensionName(param) {
  return "meta3d-bs-most";
}

function _getMeta3DEngineCoreExtensionDependentExtensionNameMap(param) {
  return {
          meta3dBsMostExtensionName: "meta3d-bs-most"
        };
}

function prepare(param) {
  var state = Main$Meta3d.prepare(undefined);
  var state$1 = Main$Meta3d.registerExtension(Main$Meta3d.registerExtension(state, "meta3d-bs-most", Main$Meta3dBsMost.getService, undefined, Main$Meta3dBsMost.createState(undefined)), "meta3d-engine-core", Main$Meta3dEngineCore.getService, {
        meta3dBsMostExtensionName: "meta3d-bs-most"
      }, Main$Meta3dEngineCore.createState(undefined));
  var engineCoreState = Main$Meta3d.getExtensionStateExn(state$1, "meta3d-engine-core");
  var match = Main$Meta3d.getServiceExn(state$1, "meta3d-engine-core");
  var engineCoreState$1 = Curry._4(match.registerWorkPlugin, engineCoreState, Main$Meta3dWorkPluginRoot.getData(Main$Meta3d.getServiceExn(state$1, "meta3d-bs-most")), undefined, undefined);
  return Main$Meta3d.setExtensionState(state$1, "meta3d-engine-core", engineCoreState$1);
}

function init(state) {
  var match = Main$Meta3d.getServiceExn(state, "meta3d-bs-most");
  var engineCoreState = Main$Meta3d.getExtensionStateExn(state, "meta3d-engine-core");
  var match$1 = Main$Meta3d.getServiceExn(state, "meta3d-engine-core");
  var __x = Curry._3(match$1.runPipeline, Curry._1(match$1.init, engineCoreState), [
        state,
        Main$Meta3d.buildAPI(undefined),
        {
          meta3dBsMostExtensionName: "meta3d-bs-most"
        }
      ], "init");
  return Curry._2(match.map, (function (engineCoreState) {
                return Main$Meta3d.setExtensionState(state, "meta3d-engine-core", engineCoreState);
              }), __x);
}

exports._getMeta3DEngineCoreExtensionName = _getMeta3DEngineCoreExtensionName;
exports._getMeta3DBsMostExtensionName = _getMeta3DBsMostExtensionName;
exports._getMeta3DEngineCoreExtensionDependentExtensionNameMap = _getMeta3DEngineCoreExtensionDependentExtensionNameMap;
exports.prepare = prepare;
exports.init = init;
/* Main-Meta3dBsMost Not a pure module */
