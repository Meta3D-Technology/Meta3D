'use strict';

var Index$Meta3dComponentPerspectivecameraprojectionProtocol = require("meta3d-component-perspectivecameraprojection-protocol/lib/js/src/Index.bs.js");
var CreateStateUtils$Meta3dComponentPerspectivecameraprojection = require("./create_state/CreateStateUtils.bs.js");
var GetGameObjectsUtils$Meta3dComponentPerspectivecameraprojection = require("./gameobject/GetGameObjectsUtils.bs.js");
var AddPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection = require("./gameobject/AddPerspectiveCameraProjectionUtils.bs.js");
var GetPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection = require("./gameobject/GetPerspectiveCameraProjectionUtils.bs.js");
var HasPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection = require("./gameobject/HasPerspectiveCameraProjectionUtils.bs.js");
var ClonePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection = require("./operate_component/ClonePerspectiveCameraProjectionUtils.bs.js");
var CreatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection = require("./operate_component/CreatePerspectiveCameraProjectionUtils.bs.js");
var RemovePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection = require("./gameobject/RemovePerspectiveCameraProjectionUtils.bs.js");
var DisposePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection = require("./operate_component/DisposePerspectiveCameraProjectionUtils.bs.js");
var GetAllPerspectiveCameraProjectionsUtils$Meta3dComponentPerspectivecameraprojection = require("./operate_component/GetAllPerspectiveCameraProjectionsUtils.bs.js");
var GetPerspectiveCameraProjectionDataUtils$Meta3dComponentPerspectivecameraprojection = require("./operate_data/GetPerspectiveCameraProjectionDataUtils.bs.js");
var SetPerspectiveCameraProjectionDataUtils$Meta3dComponentPerspectivecameraprojection = require("./operate_data/SetPerspectiveCameraProjectionDataUtils.bs.js");
var GetNeedDisposedPerspectiveCameraProjectionsUtils$Meta3dComponentPerspectivecameraprojection = require("./gameobject/GetNeedDisposedPerspectiveCameraProjectionsUtils.bs.js");

function getComponentContribute(param) {
  return {
          componentName: Index$Meta3dComponentPerspectivecameraprojectionProtocol.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$Meta3dComponentPerspectivecameraprojection.createState(param.isDebug);
            }),
          getGameObjectsFunc: GetGameObjectsUtils$Meta3dComponentPerspectivecameraprojection.get,
          createComponentFunc: CreatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.create,
          addComponentFunc: AddPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.add,
          removeComponentFunc: RemovePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.remove,
          hasComponentFunc: HasPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.has,
          getComponentFunc: GetPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.get,
          getNeedDisposedComponentsFunc: GetNeedDisposedPerspectiveCameraProjectionsUtils$Meta3dComponentPerspectivecameraprojection.get,
          getComponentDataFunc: (function (state, cameraProjection, dataName) {
              return GetPerspectiveCameraProjectionDataUtils$Meta3dComponentPerspectivecameraprojection.getData(state, cameraProjection, dataName);
            }),
          setComponentDataFunc: (function (state, cameraProjection, dataName, dataValue) {
              return SetPerspectiveCameraProjectionDataUtils$Meta3dComponentPerspectivecameraprojection.setData(state, cameraProjection, dataName, dataValue);
            }),
          deferDisposeComponentFunc: DisposePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.deferDisposeComponent,
          disposeComponentsFunc: DisposePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.disposeComponents,
          cloneComponentFunc: (function (state, countRange, param, sourcePerspectiveCameraProjection) {
              return ClonePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.clone(state, countRange, sourcePerspectiveCameraProjection);
            }),
          getAllComponentsFunc: GetAllPerspectiveCameraProjectionsUtils$Meta3dComponentPerspectivecameraprojection.getAll
        };
}

exports.getComponentContribute = getComponentContribute;
/* No side effect */
