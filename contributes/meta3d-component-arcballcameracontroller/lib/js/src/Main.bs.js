'use strict';

var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
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

function getContribute(param) {
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
          deferDisposeComponentFunc: DisposeArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.deferDisposeComponent,
          disposeComponentsFunc: DisposeArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.disposeComponents,
          cloneComponentFunc: (function (state, countRange, param, sourceArcballCameraController) {
              return CloneArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.clone(state, countRange, sourceArcballCameraController);
            }),
          getAllComponentsFunc: GetAllArcballCameraControllersUtils$Meta3dComponentArcballcameracontroller.getAll,
          restore: (function (currentState, targetState) {
              return targetState;
            }),
          deepCopy: (function (state) {
              return {
                      config: state.config,
                      maxIndex: state.maxIndex,
                      gameObjectMap: state.gameObjectMap,
                      dirtyMap: MutableSparseMap$Meta3dCommonlib.copy(state.dirtyMap),
                      distanceMap: MutableSparseMap$Meta3dCommonlib.copy(state.distanceMap),
                      minDistanceMap: MutableSparseMap$Meta3dCommonlib.copy(state.minDistanceMap),
                      phiMap: MutableSparseMap$Meta3dCommonlib.copy(state.phiMap),
                      thetaMap: MutableSparseMap$Meta3dCommonlib.copy(state.thetaMap),
                      thetaMarginMap: MutableSparseMap$Meta3dCommonlib.copy(state.thetaMarginMap),
                      targetMap: MutableSparseMap$Meta3dCommonlib.copy(state.targetMap),
                      moveSpeedXMap: MutableSparseMap$Meta3dCommonlib.copy(state.moveSpeedXMap),
                      moveSpeedYMap: MutableSparseMap$Meta3dCommonlib.copy(state.moveSpeedYMap),
                      rotateSpeedMap: MutableSparseMap$Meta3dCommonlib.copy(state.rotateSpeedMap),
                      wheelSpeedMap: MutableSparseMap$Meta3dCommonlib.copy(state.wheelSpeedMap),
                      gameObjectArcballCameraControllerMap: MutableSparseMap$Meta3dCommonlib.copy(state.gameObjectArcballCameraControllerMap),
                      needDisposedArcballCameraControllers: ArraySt$Meta3dCommonlib.copy(state.needDisposedArcballCameraControllers),
                      disposedArcballCameraControllers: ArraySt$Meta3dCommonlib.copy(state.disposedArcballCameraControllers),
                      names: state.names
                    };
            })
        };
}

exports.getContribute = getContribute;
/* No side effect */
