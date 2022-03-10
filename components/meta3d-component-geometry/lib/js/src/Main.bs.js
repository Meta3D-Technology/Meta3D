'use strict';

var Index$Meta3dComponentGeometryProtocol = require("meta3d-component-geometry-protocol/lib/js/src/Index.bs.js");
var AddGeometryUtils$Meta3dComponentGeometry = require("./gameobject/AddGeometryUtils.bs.js");
var CreateStateUtils$Meta3dComponentGeometry = require("./create_state/CreateStateUtils.bs.js");
var GetGeometryUtils$Meta3dComponentGeometry = require("./gameobject/GetGeometryUtils.bs.js");
var HasGeometryUtils$Meta3dComponentGeometry = require("./gameobject/HasGeometryUtils.bs.js");
var GetGeometrysUtils$Meta3dComponentGeometry = require("./gameobject/GetGeometrysUtils.bs.js");
var CreateGeometryUtils$Meta3dComponentGeometry = require("./operate_component/CreateGeometryUtils.bs.js");
var GetGameObjectsUtils$Meta3dComponentGeometry = require("./gameobject/GetGameObjectsUtils.bs.js");
var RemoveGeometryUtils$Meta3dComponentGeometry = require("./gameobject/RemoveGeometryUtils.bs.js");
var GetAllGeometrysUtils$Meta3dComponentGeometry = require("./operate_component/GetAllGeometrysUtils.bs.js");
var GetGeometryDataUtils$Meta3dComponentGeometry = require("./operate_data/GetGeometryDataUtils.bs.js");
var SetGeometryDataUtils$Meta3dComponentGeometry = require("./operate_data/SetGeometryDataUtils.bs.js");
var GetNeedDisposedGeometrysUtils$Meta3dComponentGeometry = require("./gameobject/GetNeedDisposedGeometrysUtils.bs.js");

function getComponentContribute(param) {
  return {
          componentName: Index$Meta3dComponentGeometryProtocol.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$Meta3dComponentGeometry.createState(param.isDebug, param.geometryPointCount, param.geometryCount);
            }),
          getGameObjectsFunc: GetGameObjectsUtils$Meta3dComponentGeometry.get,
          createComponentFunc: CreateGeometryUtils$Meta3dComponentGeometry.create,
          addComponentFunc: AddGeometryUtils$Meta3dComponentGeometry.add,
          removeComponentFunc: RemoveGeometryUtils$Meta3dComponentGeometry.remove,
          hasComponentFunc: HasGeometryUtils$Meta3dComponentGeometry.has,
          getComponentFunc: GetGeometryUtils$Meta3dComponentGeometry.get,
          getComponentsFunc: GetGeometrysUtils$Meta3dComponentGeometry.get,
          getNeedDisposedComponentsFunc: GetNeedDisposedGeometrysUtils$Meta3dComponentGeometry.get,
          getComponentDataFunc: (function (state, component, dataName) {
              return GetGeometryDataUtils$Meta3dComponentGeometry.getData(state, component, dataName);
            }),
          setComponentDataFunc: (function (state, component, dataName, dataValue) {
              return SetGeometryDataUtils$Meta3dComponentGeometry.setData(state, component, dataName, dataValue);
            }),
          deferDisposeComponentFunc: (function (state, component) {
              return state;
            }),
          disposeComponentsFunc: (function (state, components) {
              return state;
            }),
          getAllComponentsFunc: GetAllGeometrysUtils$Meta3dComponentGeometry.getAll
        };
}

exports.getComponentContribute = getComponentContribute;
/* No side effect */
