'use strict';

var Caml_option = require("rescript/lib/js/caml_option.js");
var NullableSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/NullableSt.bs.js");
var CreateState$Meta3dEngineCore = require("./state/CreateState.bs.js");
var DirectorForJs$Meta3dEngineCore = require("./manager/DirectorForJs.bs.js");
var StateContainer$Meta3dEngineCore = require("./state/StateContainer.bs.js");

function getExtensionService(api) {
  var partial_arg = [
    StateContainer$Meta3dEngineCore.unsafeGetMeta3dState,
    StateContainer$Meta3dEngineCore.setMeta3dState
  ];
  return {
          getIsDebug: (function (meta3dState) {
              return DirectorForJs$Meta3dEngineCore.getIsDebug(api.getExtensionState(meta3dState, "meta3d-engine-core-protocol"));
            }),
          setIsDebug: (function (meta3dState, value) {
              var __x = DirectorForJs$Meta3dEngineCore.setIsDebug(api.getExtensionState(meta3dState, "meta3d-engine-core-protocol"), value);
              return api.setExtensionState(meta3dState, "meta3d-engine-core-protocol", __x);
            }),
          prepare: DirectorForJs$Meta3dEngineCore.prepare,
          init: (function (meta3dState) {
              var __x = DirectorForJs$Meta3dEngineCore.init(api.getExtensionState(meta3dState, "meta3d-engine-core-protocol"), meta3dState);
              return api.setExtensionState(meta3dState, "meta3d-engine-core-protocol", __x);
            }),
          registerPipeline: (function (meta3dState, contribute, configOpt, jobOrdersOpt, param) {
              var config = configOpt !== undefined ? Caml_option.valFromOption(configOpt) : null;
              var jobOrders = jobOrdersOpt !== undefined ? jobOrdersOpt : [];
              var __x = DirectorForJs$Meta3dEngineCore.registerPipeline(api.getExtensionState(meta3dState, "meta3d-engine-core-protocol"), contribute, Caml_option.some(config), jobOrders, undefined);
              return api.setExtensionState(meta3dState, "meta3d-engine-core-protocol", __x);
            }),
          unregisterPipeline: (function (meta3dState, value) {
              var __x = DirectorForJs$Meta3dEngineCore.unregisterPipeline(api.getExtensionState(meta3dState, "meta3d-engine-core-protocol"), value);
              return api.setExtensionState(meta3dState, "meta3d-engine-core-protocol", __x);
            }),
          registerComponent: (function (meta3dState, value) {
              var __x = DirectorForJs$Meta3dEngineCore.registerComponent(api.getExtensionState(meta3dState, "meta3d-engine-core-protocol"), value);
              return api.setExtensionState(meta3dState, "meta3d-engine-core-protocol", __x);
            }),
          unregisterComponent: (function (meta3dState, value) {
              var __x = DirectorForJs$Meta3dEngineCore.unregisterComponent(api.getExtensionState(meta3dState, "meta3d-engine-core-protocol"), value);
              return api.setExtensionState(meta3dState, "meta3d-engine-core-protocol", __x);
            }),
          createAndSetComponentState: (function (meta3dState, componentName, config) {
              var __x = DirectorForJs$Meta3dEngineCore.createAndSetComponentState(api.getExtensionState(meta3dState, "meta3d-engine-core-protocol"), componentName, config);
              return api.setExtensionState(meta3dState, "meta3d-engine-core-protocol", __x);
            }),
          unsafeGetUsedComponentContribute: (function (meta3dState, value) {
              return DirectorForJs$Meta3dEngineCore.unsafeGetUsedComponentContribute(api.getExtensionState(meta3dState, "meta3d-engine-core-protocol"), value);
            }),
          setUsedComponentContribute: (function (meta3dState, usedComponentContribute, componentName) {
              var __x = DirectorForJs$Meta3dEngineCore.setUsedComponentContribute(api.getExtensionState(meta3dState, "meta3d-engine-core-protocol"), usedComponentContribute, componentName);
              return api.setExtensionState(meta3dState, "meta3d-engine-core-protocol", __x);
            }),
          createComponent: DirectorForJs$Meta3dEngineCore.createComponent,
          setComponentData: DirectorForJs$Meta3dEngineCore.setComponentData,
          addComponent: DirectorForJs$Meta3dEngineCore.addComponent,
          removeComponent: DirectorForJs$Meta3dEngineCore.removeComponent,
          hasComponent: DirectorForJs$Meta3dEngineCore.hasComponent,
          getComponent: DirectorForJs$Meta3dEngineCore.getComponent,
          deferDisposeComponent: DirectorForJs$Meta3dEngineCore.deferDisposeComponent,
          disposeComponents: DirectorForJs$Meta3dEngineCore.disposeComponents,
          getAllComponents: DirectorForJs$Meta3dEngineCore.getAllComponents,
          getComponentData: DirectorForJs$Meta3dEngineCore.getComponentData,
          getNeedDisposedComponents: DirectorForJs$Meta3dEngineCore.getNeedDisposedComponents,
          getComponentGameObjects: DirectorForJs$Meta3dEngineCore.getComponentGameObjects,
          getComponentState: (function (meta3dState, value) {
              return DirectorForJs$Meta3dEngineCore.getComponentState(api.getExtensionState(meta3dState, "meta3d-engine-core-protocol"), value);
            }),
          setGameObjectContribute: (function (meta3dState, value) {
              var __x = DirectorForJs$Meta3dEngineCore.setGameObjectContribute(api.getExtensionState(meta3dState, "meta3d-engine-core-protocol"), value);
              return api.setExtensionState(meta3dState, "meta3d-engine-core-protocol", __x);
            }),
          createAndSetGameObjectState: (function (meta3dState, value) {
              var __x = DirectorForJs$Meta3dEngineCore.createAndSetGameObjectState(api.getExtensionState(meta3dState, "meta3d-engine-core-protocol"), value);
              return api.setExtensionState(meta3dState, "meta3d-engine-core-protocol", __x);
            }),
          createGameObject: (function (meta3dState) {
              var match = DirectorForJs$Meta3dEngineCore.createGameObject(api.getExtensionState(meta3dState, "meta3d-engine-core-protocol"));
              return [
                      api.setExtensionState(meta3dState, "meta3d-engine-core-protocol", match[0]),
                      match[1]
                    ];
            }),
          getNeedDisposedGameObjects: (function (meta3dState) {
              return DirectorForJs$Meta3dEngineCore.getNeedDisposedGameObjects(api.getExtensionState(meta3dState, "meta3d-engine-core-protocol"));
            }),
          deferDisposeGameObject: (function (meta3dState, value) {
              var __x = DirectorForJs$Meta3dEngineCore.deferDisposeGameObject(api.getExtensionState(meta3dState, "meta3d-engine-core-protocol"), value);
              return api.setExtensionState(meta3dState, "meta3d-engine-core-protocol", __x);
            }),
          disposeGameObjects: (function (meta3dState, value) {
              var match = DirectorForJs$Meta3dEngineCore.disposeGameObjects(api.getExtensionState(meta3dState, "meta3d-engine-core-protocol"), value);
              return [
                      api.setExtensionState(meta3dState, "meta3d-engine-core-protocol", match[0]),
                      match[1]
                    ];
            }),
          cloneGameObject: (function (meta3dState, count, cloneConfig, sourceGameObject) {
              var match = DirectorForJs$Meta3dEngineCore.cloneGameObject(api.getExtensionState(meta3dState, "meta3d-engine-core-protocol"), count, cloneConfig, sourceGameObject);
              return [
                      api.setExtensionState(meta3dState, "meta3d-engine-core-protocol", match[0]),
                      match[1]
                    ];
            }),
          getAllGameObjects: (function (meta3dState) {
              return DirectorForJs$Meta3dEngineCore.getAllGameObjects(api.getExtensionState(meta3dState, "meta3d-engine-core-protocol"));
            }),
          getGameObjectName: (function (meta3dState, gameObject) {
              return DirectorForJs$Meta3dEngineCore.getGameObjectName(api.getExtensionState(meta3dState, "meta3d-engine-core-protocol"), gameObject);
            }),
          setGameObjectName: (function (meta3dState, gameObject, name) {
              var __x = DirectorForJs$Meta3dEngineCore.setGameObjectName(api.getExtensionState(meta3dState, "meta3d-engine-core-protocol"), gameObject, name);
              return api.setExtensionState(meta3dState, "meta3d-engine-core-protocol", __x);
            }),
          runPipeline: (function (param, param$1, param$2) {
              return DirectorForJs$Meta3dEngineCore.runPipeline(api, partial_arg, param, param$1, param$2);
            })
        };
}

function createExtensionState(param) {
  return CreateState$Meta3dEngineCore.createState(undefined);
}

function getExtensionLife(api, extensionProtocolName) {
  return {
          onRegister: null,
          onRestore: NullableSt$Meta3dCommonlib.$$return(function (param, param$1) {
                return DirectorForJs$Meta3dEngineCore.restore(api, extensionProtocolName, param, param$1);
              }),
          onDeepCopy: NullableSt$Meta3dCommonlib.$$return(function (param) {
                return DirectorForJs$Meta3dEngineCore.deepCopy(api, extensionProtocolName, param);
              }),
          onStart: null,
          onInit: null,
          onUpdate: null
        };
}

exports.getExtensionService = getExtensionService;
exports.createExtensionState = createExtensionState;
exports.getExtensionLife = getExtensionLife;
/* No side effect */
