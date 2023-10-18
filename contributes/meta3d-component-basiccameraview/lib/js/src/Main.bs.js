'use strict';

var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var Index$Meta3dComponentBasiccameraviewProtocol = require("meta3d-component-basiccameraview-protocol/lib/js/src/Index.bs.js");
var CreateStateUtils$Meta3dComponentBasiccameraview = require("./create_state/CreateStateUtils.bs.js");
var GetGameObjectsUtils$Meta3dComponentBasiccameraview = require("./gameobject/GetGameObjectsUtils.bs.js");
var AddBasicCameraViewUtils$Meta3dComponentBasiccameraview = require("./gameobject/AddBasicCameraViewUtils.bs.js");
var GetBasicCameraViewUtils$Meta3dComponentBasiccameraview = require("./gameobject/GetBasicCameraViewUtils.bs.js");
var HasBasicCameraViewUtils$Meta3dComponentBasiccameraview = require("./gameobject/HasBasicCameraViewUtils.bs.js");
var CloneBasicCameraViewUtils$Meta3dComponentBasiccameraview = require("./operate_component/CloneBasicCameraViewUtils.bs.js");
var CreateBasicCameraViewUtils$Meta3dComponentBasiccameraview = require("./operate_component/CreateBasicCameraViewUtils.bs.js");
var RemoveBasicCameraViewUtils$Meta3dComponentBasiccameraview = require("./gameobject/RemoveBasicCameraViewUtils.bs.js");
var DisposeBasicCameraViewUtils$Meta3dComponentBasiccameraview = require("./operate_component/DisposeBasicCameraViewUtils.bs.js");
var GetAllBasicCameraViewsUtils$Meta3dComponentBasiccameraview = require("./operate_component/GetAllBasicCameraViewsUtils.bs.js");
var GetBasicCameraViewDataUtils$Meta3dComponentBasiccameraview = require("./operate_data/GetBasicCameraViewDataUtils.bs.js");
var SetBasicCameraViewDataUtils$Meta3dComponentBasiccameraview = require("./operate_data/SetBasicCameraViewDataUtils.bs.js");
var GetNeedDisposedBasicCameraViewsUtils$Meta3dComponentBasiccameraview = require("./gameobject/GetNeedDisposedBasicCameraViewsUtils.bs.js");

function getContribute(param) {
  return {
          componentName: Index$Meta3dComponentBasiccameraviewProtocol.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$Meta3dComponentBasiccameraview.createState(param.isDebug);
            }),
          getGameObjectsFunc: GetGameObjectsUtils$Meta3dComponentBasiccameraview.get,
          createComponentFunc: CreateBasicCameraViewUtils$Meta3dComponentBasiccameraview.create,
          addComponentFunc: AddBasicCameraViewUtils$Meta3dComponentBasiccameraview.add,
          removeComponentFunc: RemoveBasicCameraViewUtils$Meta3dComponentBasiccameraview.remove,
          hasComponentFunc: HasBasicCameraViewUtils$Meta3dComponentBasiccameraview.has,
          getComponentFunc: GetBasicCameraViewUtils$Meta3dComponentBasiccameraview.get,
          getNeedDisposedComponentsFunc: GetNeedDisposedBasicCameraViewsUtils$Meta3dComponentBasiccameraview.get,
          getComponentDataFunc: (function (state, cameraView, dataName) {
              return GetBasicCameraViewDataUtils$Meta3dComponentBasiccameraview.getData(state, cameraView, dataName);
            }),
          setComponentDataFunc: (function (state, cameraView, dataName, dataValue) {
              return SetBasicCameraViewDataUtils$Meta3dComponentBasiccameraview.setData(state, cameraView, dataName, dataValue);
            }),
          deferDisposeComponentFunc: DisposeBasicCameraViewUtils$Meta3dComponentBasiccameraview.deferDisposeComponent,
          disposeComponentsFunc: DisposeBasicCameraViewUtils$Meta3dComponentBasiccameraview.disposeComponents,
          cloneComponentFunc: (function (state, countRange, param, sourceBasicCameraView) {
              return CloneBasicCameraViewUtils$Meta3dComponentBasiccameraview.clone(state, countRange, sourceBasicCameraView);
            }),
          getAllComponentsFunc: GetAllBasicCameraViewsUtils$Meta3dComponentBasiccameraview.getAll,
          restore: (function (currentState, targetState) {
              return targetState;
            }),
          deepCopy: (function (state) {
              return {
                      config: state.config,
                      maxIndex: state.maxIndex,
                      isActiveMap: MutableSparseMap$Meta3dCommonlib.copy(state.isActiveMap),
                      gameObjectMap: MutableSparseMap$Meta3dCommonlib.copy(state.gameObjectMap),
                      gameObjectBasicCameraViewMap: MutableSparseMap$Meta3dCommonlib.copy(state.gameObjectBasicCameraViewMap),
                      needDisposedBasicCameraViews: ArraySt$Meta3dCommonlib.copy(state.needDisposedBasicCameraViews),
                      disposedBasicCameraViews: ArraySt$Meta3dCommonlib.copy(state.disposedBasicCameraViews)
                    };
            })
        };
}

exports.getContribute = getContribute;
/* No side effect */
