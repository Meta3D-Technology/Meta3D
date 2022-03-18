'use strict';

var Index$Meta3dComponentArcballcameracontrollerProtocol = require("meta3d-component-arcballcameracontroller-protocol/lib/js/src/Index.bs.js");
var CreateStateUtils$Meta3dComponentArcballcameracontroller = require("./create_state/CreateStateUtils.bs.js");
var GetGameObjectsUtils$Meta3dComponentArcballcameracontroller = require("./gameobject/GetGameObjectsUtils.bs.js");
var AddArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller = require("./gameobject/AddArcballCameraControllerUtils.bs.js");
var GetArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller = require("./gameobject/GetArcballCameraControllerUtils.bs.js");
var HasArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller = require("./gameobject/HasArcballCameraControllerUtils.bs.js");
var CreateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller = require("./operate_component/CreateArcballCameraControllerUtils.bs.js");
var GetAllArcballCameraControllersUtils$Meta3dComponentArcballcameracontroller = require("./operate_component/GetAllArcballCameraControllersUtils.bs.js");
var GetArcballCameraControllerDataUtils$Meta3dComponentArcballcameracontroller = require("./operate_data/GetArcballCameraControllerDataUtils.bs.js");
var SetArcballCameraControllerDataUtils$Meta3dComponentArcballcameracontroller = require("./operate_data/SetArcballCameraControllerDataUtils.bs.js");

function getComponentContribute(param) {
  return {
          componentName: Index$Meta3dComponentArcballcameracontrollerProtocol.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$Meta3dComponentArcballcameracontroller.createState(param.isDebug);
            }),
          getGameObjectsFunc: GetGameObjectsUtils$Meta3dComponentArcballcameracontroller.get,
          createComponentFunc: CreateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.create,
          addComponentFunc: AddArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.add,
          removeComponentFunc: (function (state, gameObject, transform) {
              return state;
            }),
          hasComponentFunc: HasArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.has,
          getComponentFunc: GetArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.get,
          getNeedDisposedComponentsFunc: (function (state) {
              return [];
            }),
          getComponentDataFunc: (function (state, component, dataName) {
              return GetArcballCameraControllerDataUtils$Meta3dComponentArcballcameracontroller.getData(state, component, dataName);
            }),
          setComponentDataFunc: (function (state, component, dataName, dataValue) {
              return SetArcballCameraControllerDataUtils$Meta3dComponentArcballcameracontroller.setData(state, component, dataName, dataValue);
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
          getAllComponentsFunc: GetAllArcballCameraControllersUtils$Meta3dComponentArcballcameracontroller.getAll
        };
}

exports.getComponentContribute = getComponentContribute;
/* No side effect */
