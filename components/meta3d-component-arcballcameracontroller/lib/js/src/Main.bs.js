'use strict';

var Index$Meta3dComponentArcballcameracontrollerProtocol = require("meta3d-component-arcballcameracontroller-protocol/lib/js/src/Index.bs.js");
var CreateStateUtils$Meta3dComponentArcballcameracontroller = require("./create_state/CreateStateUtils.bs.js");
var GetGameObjectsUtils$Meta3dComponentArcballcameracontroller = require("./gameobject/GetGameObjectsUtils.bs.js");
var AddArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller = require("./gameobject/AddArcballCameraControllerUtils.bs.js");
var GetArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller = require("./gameobject/GetArcballCameraControllerUtils.bs.js");
var HasArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller = require("./gameobject/HasArcballCameraControllerUtils.bs.js");
var CloneArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller = require("./operate_component/CloneArcballCameraControllerUtils.bs.js");
var CreateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller = require("./operate_component/CreateArcballCameraControllerUtils.bs.js");
var RemoveArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller = require("./gameobject/RemoveArcballCameraControllerUtils.bs.js");
var DisposeArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller = require("./operate_component/DisposeArcballCameraControllerUtils.bs.js");
var GetAllArcballCameraControllersUtils$Meta3dComponentArcballcameracontroller = require("./operate_component/GetAllArcballCameraControllersUtils.bs.js");
var GetArcballCameraControllerDataUtils$Meta3dComponentArcballcameracontroller = require("./operate_data/GetArcballCameraControllerDataUtils.bs.js");
var SetArcballCameraControllerDataUtils$Meta3dComponentArcballcameracontroller = require("./operate_data/SetArcballCameraControllerDataUtils.bs.js");
var GetNeedDisposedArcballCameraControllersUtils$Meta3dComponentArcballcameracontroller = require("./gameobject/GetNeedDisposedArcballCameraControllersUtils.bs.js");

function getComponentContribute(param) {
  return {
          componentName: Index$Meta3dComponentArcballcameracontrollerProtocol.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$Meta3dComponentArcballcameracontroller.createState(param.isDebug);
            }),
          getGameObjectsFunc: GetGameObjectsUtils$Meta3dComponentArcballcameracontroller.get,
          createComponentFunc: CreateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.create,
          addComponentFunc: AddArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.add,
          removeComponentFunc: RemoveArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.remove,
          hasComponentFunc: HasArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.has,
          getComponentFunc: GetArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.get,
          getNeedDisposedComponentsFunc: GetNeedDisposedArcballCameraControllersUtils$Meta3dComponentArcballcameracontroller.get,
          getComponentDataFunc: (function (state, cameraController, dataName) {
              return GetArcballCameraControllerDataUtils$Meta3dComponentArcballcameracontroller.getData(state, cameraController, dataName);
            }),
          setComponentDataFunc: (function (state, cameraController, dataName, dataValue) {
              return SetArcballCameraControllerDataUtils$Meta3dComponentArcballcameracontroller.setData(state, cameraController, dataName, dataValue);
            }),
          deferDisposeComponentFunc: (function (state, cameraControllerData) {
              return DisposeArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.deferDisposeComponent(state)(cameraControllerData);
            }),
          disposeComponentsFunc: (function (state, cameraControllers) {
              return DisposeArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.disposeComponents(state)(cameraControllers);
            }),
          cloneComponentFunc: (function (state, countRange, param, sourceArcballCameraController) {
              return CloneArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.clone(state, countRange, sourceArcballCameraController);
            }),
          getAllComponentsFunc: GetAllArcballCameraControllersUtils$Meta3dComponentArcballcameracontroller.getAll
        };
}

exports.getComponentContribute = getComponentContribute;
/* No side effect */
