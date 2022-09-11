'use strict';

var Index$Meta3dComponentGeometryProtocol = require("meta3d-component-geometry-protocol/lib/js/src/Index.bs.js");
var AddGeometryUtils$Meta3dComponentGeometry = require("./gameobject/AddGeometryUtils.bs.js");
var CreateStateUtils$Meta3dComponentGeometry = require("./create_state/CreateStateUtils.bs.js");
var GetGeometryUtils$Meta3dComponentGeometry = require("./gameobject/GetGeometryUtils.bs.js");
var HasGeometryUtils$Meta3dComponentGeometry = require("./gameobject/HasGeometryUtils.bs.js");
var CloneGeometryUtils$Meta3dComponentGeometry = require("./operate_component/CloneGeometryUtils.bs.js");
var CreateGeometryUtils$Meta3dComponentGeometry = require("./operate_component/CreateGeometryUtils.bs.js");
var GetGameObjectsUtils$Meta3dComponentGeometry = require("./gameobject/GetGameObjectsUtils.bs.js");
var RemoveGeometryUtils$Meta3dComponentGeometry = require("./gameobject/RemoveGeometryUtils.bs.js");
var DisposeGeometryUtils$Meta3dComponentGeometry = require("./operate_component/DisposeGeometryUtils.bs.js");
var GetAllGeometrysUtils$Meta3dComponentGeometry = require("./operate_component/GetAllGeometrysUtils.bs.js");
var GetGeometryDataUtils$Meta3dComponentGeometry = require("./operate_data/GetGeometryDataUtils.bs.js");
var SetGeometryDataUtils$Meta3dComponentGeometry = require("./operate_data/SetGeometryDataUtils.bs.js");
var GetNeedDisposedGeometrysUtils$Meta3dComponentGeometry = require("./gameobject/GetNeedDisposedGeometrysUtils.bs.js");

function getContribute(param, param$1) {
  return {
          componentName: Index$Meta3dComponentGeometryProtocol.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$Meta3dComponentGeometry.createState(param.isDebug, param.geometryPointCount, param.geometryCount);
            }),
          getGameObjectsFunc: (function (state, geometry) {
              return GetGameObjectsUtils$Meta3dComponentGeometry.get(state)(geometry);
            }),
          createComponentFunc: CreateGeometryUtils$Meta3dComponentGeometry.create,
          addComponentFunc: (function (state, gameObject, geometry) {
              return AddGeometryUtils$Meta3dComponentGeometry.add(state)(gameObject, geometry);
            }),
          removeComponentFunc: (function (state, gameObject, geometry) {
              return RemoveGeometryUtils$Meta3dComponentGeometry.remove(state)(gameObject, geometry);
            }),
          hasComponentFunc: (function (state, gameObject) {
              return HasGeometryUtils$Meta3dComponentGeometry.has(state)(gameObject);
            }),
          getComponentFunc: (function (state, gameObject) {
              return GetGeometryUtils$Meta3dComponentGeometry.get(state)(gameObject);
            }),
          getNeedDisposedComponentsFunc: GetNeedDisposedGeometrysUtils$Meta3dComponentGeometry.get,
          getComponentDataFunc: (function (state, geometry, dataName) {
              return GetGeometryDataUtils$Meta3dComponentGeometry.getData(state, geometry, dataName);
            }),
          setComponentDataFunc: (function (state, geometry, dataName, dataValue) {
              return SetGeometryDataUtils$Meta3dComponentGeometry.setData(state, geometry, dataName, dataValue);
            }),
          deferDisposeComponentFunc: (function (state, param) {
              return DisposeGeometryUtils$Meta3dComponentGeometry.deferDisposeComponent(state)([
                          param[0],
                          param[1]
                        ]);
            }),
          disposeComponentsFunc: DisposeGeometryUtils$Meta3dComponentGeometry.disposeComponents,
          cloneComponentFunc: (function (state, countRange, cloneConfig, sourceGeometry) {
              return CloneGeometryUtils$Meta3dComponentGeometry.clone(state, countRange, sourceGeometry);
            }),
          getAllComponentsFunc: GetAllGeometrysUtils$Meta3dComponentGeometry.getAll
        };
}

exports.getContribute = getContribute;
/* No side effect */
