'use strict';

var Index$Meta3dComponentDirectionlightProtocol = require("meta3d-component-directionlight-protocol/lib/js/src/Index.bs.js");
var CreateStateUtils$Meta3dComponentDirectionlight = require("./create_state/CreateStateUtils.bs.js");
var GetGameObjectsUtils$Meta3dComponentDirectionlight = require("./gameobject/GetGameObjectsUtils.bs.js");
var AddDirectionLightUtils$Meta3dComponentDirectionlight = require("./gameobject/AddDirectionLightUtils.bs.js");
var GetDirectionLightUtils$Meta3dComponentDirectionlight = require("./gameobject/GetDirectionLightUtils.bs.js");
var HasDirectionLightUtils$Meta3dComponentDirectionlight = require("./gameobject/HasDirectionLightUtils.bs.js");
var CreateDirectionLightUtils$Meta3dComponentDirectionlight = require("./operate_component/CreateDirectionLightUtils.bs.js");
var GetAllDirectionLightsUtils$Meta3dComponentDirectionlight = require("./operate_component/GetAllDirectionLightsUtils.bs.js");
var GetDirectionLightDataUtils$Meta3dComponentDirectionlight = require("./operate_data/GetDirectionLightDataUtils.bs.js");
var SetDirectionLightDataUtils$Meta3dComponentDirectionlight = require("./operate_data/SetDirectionLightDataUtils.bs.js");

function getComponentContribute(param) {
  return {
          componentName: Index$Meta3dComponentDirectionlightProtocol.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$Meta3dComponentDirectionlight.createState(param.isDebug, param.directionLightCount);
            }),
          getGameObjectsFunc: GetGameObjectsUtils$Meta3dComponentDirectionlight.get,
          createComponentFunc: CreateDirectionLightUtils$Meta3dComponentDirectionlight.create,
          addComponentFunc: AddDirectionLightUtils$Meta3dComponentDirectionlight.add,
          removeComponentFunc: (function (state, gameObject, transform) {
              return state;
            }),
          hasComponentFunc: HasDirectionLightUtils$Meta3dComponentDirectionlight.has,
          getComponentFunc: GetDirectionLightUtils$Meta3dComponentDirectionlight.get,
          getNeedDisposedComponentsFunc: (function (state) {
              return [];
            }),
          getComponentDataFunc: (function (state, component, dataName) {
              return GetDirectionLightDataUtils$Meta3dComponentDirectionlight.getData(state, component, dataName);
            }),
          setComponentDataFunc: (function (state, component, dataName, dataValue) {
              return SetDirectionLightDataUtils$Meta3dComponentDirectionlight.setData(state, component, dataName, dataValue);
            }),
          deferDisposeComponentFunc: (function (state, transform) {
              return state;
            }),
          disposeComponentsFunc: (function (state, transforms) {
              return state;
            }),
          cloneComponentFunc: (function (state, countRange, param, sourceTransform) {
              return [
                      state,
                      []
                    ];
            }),
          getAllComponentsFunc: GetAllDirectionLightsUtils$Meta3dComponentDirectionlight.getAll
        };
}

exports.getComponentContribute = getComponentContribute;
/* No side effect */
