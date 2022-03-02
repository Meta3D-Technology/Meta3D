

import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Main$Meta3d from "../../../../../node_modules/meta3d/lib/es6_global/src/Main.bs.js";
import * as Main$Meta3dBsMost from "../../../../../node_modules/meta3d-bs-most/lib/es6_global/src/Main.bs.js";
import * as Main$Meta3dEngineCore from "../../../../../node_modules/meta3d-engine-core/lib/es6_global/src/Main.bs.js";
import * as Main$Meta3dWorkPluginRoot from "../../../../../node_modules/meta3d-work-plugin-root/lib/es6_global/src/Main.bs.js";
import * as Main$Meta3dComponentTransform from "../../../../../node_modules/meta3d-component-transform/lib/es6_global/src/Main.bs.js";
import * as Main$Meta3dGameobjectDataoriented from "../../../../../node_modules/meta3d-gameobject-dataoriented/lib/es6_global/src/Main.bs.js";
import * as Index$Meta3dComponentTransformProtocol from "../../../../../node_modules/meta3d-component-transform-protocol/lib/es6_global/src/Index.bs.js";

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
  var state$1 = Main$Meta3d.registerExtension(Main$Meta3d.registerExtension(state, "meta3d-bs-most", Main$Meta3dBsMost.getExtensionService, undefined, Main$Meta3dBsMost.createExtensionState(undefined)), "meta3d-engine-core", Main$Meta3dEngineCore.getExtensionService, {
        meta3dBsMostExtensionName: "meta3d-bs-most"
      }, Main$Meta3dEngineCore.createExtensionState(undefined));
  var engineCoreState = Main$Meta3d.getExtensionState(state$1, "meta3d-engine-core");
  var match = Main$Meta3d.getExtensionService(state$1, "meta3d-engine-core");
  var engineCoreState$1 = Curry._3(match.createAndSetComponentState, Curry._2(match.registerComponent, engineCoreState, Main$Meta3dComponentTransform.getComponentContribute(undefined)), Index$Meta3dComponentTransformProtocol.componentName, {
        isDebug: param.isDebug,
        float9Array1: param.float9Array1,
        float32Array1: param.float32Array1,
        transformCount: param.transformCount
      });
  var engineCoreState$2 = Curry._1(match.createAndSetGameObjectState, Curry._2(match.setGameObjectContribute, engineCoreState$1, Main$Meta3dGameobjectDataoriented.getGameObjectContribute(undefined)));
  var engineCoreState$3 = Curry._4(match.registerWorkPlugin, engineCoreState$2, Main$Meta3dWorkPluginRoot.getWorkPluginContribute(Main$Meta3d.getExtensionService(state$1, "meta3d-bs-most")), undefined, undefined);
  return Main$Meta3d.setExtensionState(state$1, "meta3d-engine-core", engineCoreState$3);
}

function init(state) {
  var match = Main$Meta3d.getExtensionService(state, "meta3d-bs-most");
  var engineCoreState = Main$Meta3d.getExtensionState(state, "meta3d-engine-core");
  var match$1 = Main$Meta3d.getExtensionService(state, "meta3d-engine-core");
  var __x = Curry._3(match$1.runPipeline, Curry._1(match$1.init, engineCoreState), state, "init");
  return Curry._2(match.map, (function (engineCoreState) {
                return Main$Meta3d.setExtensionState(state, "meta3d-engine-core", engineCoreState);
              }), __x);
}

function create(state) {
  var engineCoreState = Main$Meta3d.getExtensionState(state, "meta3d-engine-core");
  var match = Main$Meta3d.getExtensionService(state, "meta3d-engine-core");
  var contribute = Curry._2(match.unsafeGetUsedComponentContribute, engineCoreState, Index$Meta3dComponentTransformProtocol.componentName);
  var match$1 = Curry._1(match.createComponent, contribute);
  var engineCoreState$1 = Curry._3(match.setUsedComponentContribute, engineCoreState, match$1[0], Index$Meta3dComponentTransformProtocol.componentName);
  return [
          Main$Meta3d.setExtensionState(state, "meta3d-engine-core", engineCoreState$1),
          match$1[1]
        ];
}

var TransformAPI = {
  create: create
};

function create$1(state) {
  var engineCoreState = Main$Meta3d.getExtensionState(state, "meta3d-engine-core");
  var match = Main$Meta3d.getExtensionService(state, "meta3d-engine-core");
  var match$1 = Curry._1(match.createGameObject, engineCoreState);
  return [
          Main$Meta3d.setExtensionState(state, "meta3d-engine-core", match$1[0]),
          match$1[1]
        ];
}

function getAllGameObjects(state) {
  var engineCoreState = Main$Meta3d.getExtensionState(state, "meta3d-engine-core");
  var match = Main$Meta3d.getExtensionService(state, "meta3d-engine-core");
  return Curry._1(match.getAllGameObjects, engineCoreState);
}

var GameObjectAPI = {
  create: create$1,
  getAllGameObjects: getAllGameObjects
};

export {
  _getMeta3DEngineCoreExtensionName ,
  _getMeta3DBsMostExtensionName ,
  _getMeta3DEngineCoreExtensionDependentExtensionNameMap ,
  prepare ,
  init ,
  TransformAPI ,
  GameObjectAPI ,
  
}
/* Main-Meta3dBsMost Not a pure module */
