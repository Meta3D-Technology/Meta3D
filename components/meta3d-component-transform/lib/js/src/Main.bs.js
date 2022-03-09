'use strict';

var Index$Meta3dComponentTransformProtocol = require("meta3d-component-transform-protocol/lib/js/src/Index.bs.js");
var CreateStateUtils$Meta3dComponentTransform = require("./create_state/CreateStateUtils.bs.js");
var AddTransformUtils$Meta3dComponentTransform = require("./gameobject/AddTransformUtils.bs.js");
var GetTransformUtils$Meta3dComponentTransform = require("./gameobject/GetTransformUtils.bs.js");
var HasTransformUtils$Meta3dComponentTransform = require("./gameobject/HasTransformUtils.bs.js");
var GetTransformsUtils$Meta3dComponentTransform = require("./gameobject/GetTransformsUtils.bs.js");
var GetGameObjectsUtils$Meta3dComponentTransform = require("./gameobject/GetGameObjectsUtils.bs.js");
var CreateTransformUtils$Meta3dComponentTransform = require("./operate_component/CreateTransformUtils.bs.js");
var RemoveTransformUtils$Meta3dComponentTransform = require("./gameobject/RemoveTransformUtils.bs.js");
var DisposeTransformUtils$Meta3dComponentTransform = require("./operate_data/DisposeTransformUtils.bs.js");
var GetAllTransformsUtils$Meta3dComponentTransform = require("./operate_component/GetAllTransformsUtils.bs.js");
var GetTransformDataUtils$Meta3dComponentTransform = require("./operate_data/GetTransformDataUtils.bs.js");
var SetTransformDataUtils$Meta3dComponentTransform = require("./operate_data/SetTransformDataUtils.bs.js");
var GetNeedDisposedTransformsUtils$Meta3dComponentTransform = require("./gameobject/GetNeedDisposedTransformsUtils.bs.js");

function getComponentContribute(param) {
  return {
          componentName: Index$Meta3dComponentTransformProtocol.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$Meta3dComponentTransform.createState(param.isDebug, param.transformCount, param.float9Array1, param.float32Array1);
            }),
          getGameObjectsFunc: (function (state, component) {
              return GetGameObjectsUtils$Meta3dComponentTransform.get(state)(component);
            }),
          createComponentFunc: CreateTransformUtils$Meta3dComponentTransform.create,
          addComponentFunc: (function (state, gameObject, component) {
              return AddTransformUtils$Meta3dComponentTransform.add(state)(gameObject, component);
            }),
          removeComponentFunc: (function (state, gameObject, component) {
              return RemoveTransformUtils$Meta3dComponentTransform.remove(state)(gameObject, component);
            }),
          hasComponentFunc: (function (state, gameObject) {
              return HasTransformUtils$Meta3dComponentTransform.has(state)(gameObject);
            }),
          getComponentFunc: (function (state, gameObject) {
              return GetTransformUtils$Meta3dComponentTransform.get(state)(gameObject);
            }),
          getComponentsFunc: (function (state, gameObjects) {
              return GetTransformsUtils$Meta3dComponentTransform.get(state)(gameObjects);
            }),
          getNeedDisposedComponentsFunc: GetNeedDisposedTransformsUtils$Meta3dComponentTransform.get,
          getComponentDataFunc: (function (state, component, dataName) {
              return GetTransformDataUtils$Meta3dComponentTransform.getData(state, component, dataName);
            }),
          setComponentDataFunc: (function (state, component, dataName, dataValue) {
              return SetTransformDataUtils$Meta3dComponentTransform.setData(state, component, dataName, dataValue);
            }),
          deferDisposeComponentFunc: (function (state, component) {
              return DisposeTransformUtils$Meta3dComponentTransform.deferDisposeComponent(state)(component);
            }),
          disposeComponentsFunc: (function (state, components) {
              return DisposeTransformUtils$Meta3dComponentTransform.disposeComponents(state)(components);
            }),
          getAllComponentsFunc: GetAllTransformsUtils$Meta3dComponentTransform.getAll
        };
}

exports.getComponentContribute = getComponentContribute;
/* No side effect */
