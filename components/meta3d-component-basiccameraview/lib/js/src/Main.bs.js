'use strict';

var Index$Meta3dComponentBasiccameraviewProtocol = require("meta3d-component-basiccameraview-protocol/lib/js/src/Index.bs.js");
var CreateStateUtils$Meta3dComponentBasiccameraview = require("./create_state/CreateStateUtils.bs.js");
var GetGameObjectsUtils$Meta3dComponentBasiccameraview = require("./gameobject/GetGameObjectsUtils.bs.js");
var AddBasicCameraViewUtils$Meta3dComponentBasiccameraview = require("./gameobject/AddBasicCameraViewUtils.bs.js");
var GetBasicCameraViewUtils$Meta3dComponentBasiccameraview = require("./gameobject/GetBasicCameraViewUtils.bs.js");
var HasBasicCameraViewUtils$Meta3dComponentBasiccameraview = require("./gameobject/HasBasicCameraViewUtils.bs.js");
var CreateBasicCameraViewUtils$Meta3dComponentBasiccameraview = require("./operate_component/CreateBasicCameraViewUtils.bs.js");
var GetAllBasicCameraViewsUtils$Meta3dComponentBasiccameraview = require("./operate_component/GetAllBasicCameraViewsUtils.bs.js");
var GetBasicCameraViewDataUtils$Meta3dComponentBasiccameraview = require("./operate_data/GetBasicCameraViewDataUtils.bs.js");
var SetBasicCameraViewDataUtils$Meta3dComponentBasiccameraview = require("./operate_data/SetBasicCameraViewDataUtils.bs.js");

function getComponentContribute(param) {
  return {
          componentName: Index$Meta3dComponentBasiccameraviewProtocol.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$Meta3dComponentBasiccameraview.createState(param.isDebug);
            }),
          getGameObjectsFunc: GetGameObjectsUtils$Meta3dComponentBasiccameraview.get,
          createComponentFunc: CreateBasicCameraViewUtils$Meta3dComponentBasiccameraview.create,
          addComponentFunc: AddBasicCameraViewUtils$Meta3dComponentBasiccameraview.add,
          removeComponentFunc: (function (state, gameObject, transform) {
              return state;
            }),
          hasComponentFunc: HasBasicCameraViewUtils$Meta3dComponentBasiccameraview.has,
          getComponentFunc: GetBasicCameraViewUtils$Meta3dComponentBasiccameraview.get,
          getNeedDisposedComponentsFunc: (function (state) {
              return [];
            }),
          getComponentDataFunc: (function (state, component, dataName) {
              return GetBasicCameraViewDataUtils$Meta3dComponentBasiccameraview.getData(state, component, dataName);
            }),
          setComponentDataFunc: (function (state, component, dataName, dataValue) {
              return SetBasicCameraViewDataUtils$Meta3dComponentBasiccameraview.setData(state, component, dataName, dataValue);
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
          getAllComponentsFunc: GetAllBasicCameraViewsUtils$Meta3dComponentBasiccameraview.getAll
        };
}

exports.getComponentContribute = getComponentContribute;
/* No side effect */
