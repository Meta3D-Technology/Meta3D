'use strict';

var Index$Meta3dComponentPerspectivecameraprojectionProtocol = require("meta3d-component-perspectivecameraprojection-protocol/lib/js/src/Index.bs.js");
var CreateStateUtils$Meta3dComponentPerspectivecameraprojection = require("./create_state/CreateStateUtils.bs.js");
var GetGameObjectsUtils$Meta3dComponentPerspectivecameraprojection = require("./gameobject/GetGameObjectsUtils.bs.js");
var AddPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection = require("./gameobject/AddPerspectiveCameraProjectionUtils.bs.js");
var GetPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection = require("./gameobject/GetPerspectiveCameraProjectionUtils.bs.js");
var HasPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection = require("./gameobject/HasPerspectiveCameraProjectionUtils.bs.js");
var CreatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection = require("./operate_component/CreatePerspectiveCameraProjectionUtils.bs.js");
var GetAllPerspectiveCameraProjectionsUtils$Meta3dComponentPerspectivecameraprojection = require("./operate_component/GetAllPerspectiveCameraProjectionsUtils.bs.js");
var GetPerspectiveCameraProjectionDataUtils$Meta3dComponentPerspectivecameraprojection = require("./operate_data/GetPerspectiveCameraProjectionDataUtils.bs.js");
var SetPerspectiveCameraProjectionDataUtils$Meta3dComponentPerspectivecameraprojection = require("./operate_data/SetPerspectiveCameraProjectionDataUtils.bs.js");

function getComponentContribute(param) {
  return {
          componentName: Index$Meta3dComponentPerspectivecameraprojectionProtocol.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$Meta3dComponentPerspectivecameraprojection.createState(param.isDebug);
            }),
          getGameObjectsFunc: GetGameObjectsUtils$Meta3dComponentPerspectivecameraprojection.get,
          createComponentFunc: CreatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.create,
          addComponentFunc: AddPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.add,
          removeComponentFunc: (function (state, gameObject, transform) {
              return state;
            }),
          hasComponentFunc: HasPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.has,
          getComponentFunc: GetPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.get,
          getNeedDisposedComponentsFunc: (function (state) {
              return [];
            }),
          getComponentDataFunc: (function (state, component, dataName) {
              return GetPerspectiveCameraProjectionDataUtils$Meta3dComponentPerspectivecameraprojection.getData(state, component, dataName);
            }),
          setComponentDataFunc: (function (state, component, dataName, dataValue) {
              return SetPerspectiveCameraProjectionDataUtils$Meta3dComponentPerspectivecameraprojection.setData(state, component, dataName, dataValue);
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
          getAllComponentsFunc: GetAllPerspectiveCameraProjectionsUtils$Meta3dComponentPerspectivecameraprojection.getAll
        };
}

exports.getComponentContribute = getComponentContribute;
/* No side effect */
