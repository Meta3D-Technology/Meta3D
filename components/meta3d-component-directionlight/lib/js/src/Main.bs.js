'use strict';

var Index$Meta3dComponentDirectionlightProtocol = require("meta3d-component-directionlight-protocol/lib/js/src/Index.bs.js");
var CreateStateUtils$Meta3dComponentDirectionlight = require("./create_state/CreateStateUtils.bs.js");
var GetGameObjectsUtils$Meta3dComponentDirectionlight = require("./gameobject/GetGameObjectsUtils.bs.js");
var AddDirectionLightUtils$Meta3dComponentDirectionlight = require("./gameobject/AddDirectionLightUtils.bs.js");
var GetDirectionLightUtils$Meta3dComponentDirectionlight = require("./gameobject/GetDirectionLightUtils.bs.js");
var HasDirectionLightUtils$Meta3dComponentDirectionlight = require("./gameobject/HasDirectionLightUtils.bs.js");
var CloneDirectionLightUtils$Meta3dComponentDirectionlight = require("./operate_component/CloneDirectionLightUtils.bs.js");
var CreateDirectionLightUtils$Meta3dComponentDirectionlight = require("./operate_component/CreateDirectionLightUtils.bs.js");
var RemoveDirectionLightUtils$Meta3dComponentDirectionlight = require("./gameobject/RemoveDirectionLightUtils.bs.js");
var DisposeDirectionLightUtils$Meta3dComponentDirectionlight = require("./operate_component/DisposeDirectionLightUtils.bs.js");
var GetAllDirectionLightsUtils$Meta3dComponentDirectionlight = require("./operate_component/GetAllDirectionLightsUtils.bs.js");
var GetDirectionLightDataUtils$Meta3dComponentDirectionlight = require("./operate_data/GetDirectionLightDataUtils.bs.js");
var SetDirectionLightDataUtils$Meta3dComponentDirectionlight = require("./operate_data/SetDirectionLightDataUtils.bs.js");
var GetNeedDisposedDirectionLightsUtils$Meta3dComponentDirectionlight = require("./gameobject/GetNeedDisposedDirectionLightsUtils.bs.js");

function getComponentContribute(param) {
  return {
          componentName: Index$Meta3dComponentDirectionlightProtocol.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$Meta3dComponentDirectionlight.createState(param.isDebug, param.directionLightCount);
            }),
          getGameObjectsFunc: (function (state, light) {
              return GetGameObjectsUtils$Meta3dComponentDirectionlight.get(state)(light);
            }),
          createComponentFunc: CreateDirectionLightUtils$Meta3dComponentDirectionlight.create,
          addComponentFunc: (function (state, gameObject, light) {
              return AddDirectionLightUtils$Meta3dComponentDirectionlight.add(state)(gameObject, light);
            }),
          removeComponentFunc: (function (state, gameObject, light) {
              return RemoveDirectionLightUtils$Meta3dComponentDirectionlight.remove(state)(gameObject, light);
            }),
          hasComponentFunc: HasDirectionLightUtils$Meta3dComponentDirectionlight.has,
          getComponentFunc: GetDirectionLightUtils$Meta3dComponentDirectionlight.get,
          getNeedDisposedComponentsFunc: GetNeedDisposedDirectionLightsUtils$Meta3dComponentDirectionlight.get,
          getComponentDataFunc: (function (state, light, dataName) {
              return GetDirectionLightDataUtils$Meta3dComponentDirectionlight.getData(state, light, dataName);
            }),
          setComponentDataFunc: (function (state, light, dataName, dataValue) {
              return SetDirectionLightDataUtils$Meta3dComponentDirectionlight.setData(state, light, dataName, dataValue);
            }),
          deferDisposeComponentFunc: (function (state, lightData) {
              return DisposeDirectionLightUtils$Meta3dComponentDirectionlight.deferDisposeComponent(state)(lightData);
            }),
          disposeComponentsFunc: (function (state, lights) {
              return DisposeDirectionLightUtils$Meta3dComponentDirectionlight.disposeComponents(state)(lights);
            }),
          cloneComponentFunc: (function (state, countRange, param, sourceDirectionLight) {
              return CloneDirectionLightUtils$Meta3dComponentDirectionlight.clone(state, countRange, sourceDirectionLight);
            }),
          getAllComponentsFunc: GetAllDirectionLightsUtils$Meta3dComponentDirectionlight.getAll
        };
}

exports.getComponentContribute = getComponentContribute;
/* No side effect */
