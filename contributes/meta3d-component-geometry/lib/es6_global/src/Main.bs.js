

import * as Index$Meta3dComponentGeometryProtocol from "./../../../../meta3d-component-geometry-protocol/lib/es6_global/src/Index.bs.js";
import * as AddGeometryUtils$Meta3dComponentGeometry from "./gameobject/AddGeometryUtils.bs.js";
import * as CreateStateUtils$Meta3dComponentGeometry from "./create_state/CreateStateUtils.bs.js";
import * as GetGeometryUtils$Meta3dComponentGeometry from "./gameobject/GetGeometryUtils.bs.js";
import * as HasGeometryUtils$Meta3dComponentGeometry from "./gameobject/HasGeometryUtils.bs.js";
import * as CloneGeometryUtils$Meta3dComponentGeometry from "./operate_component/CloneGeometryUtils.bs.js";
import * as CreateGeometryUtils$Meta3dComponentGeometry from "./operate_component/CreateGeometryUtils.bs.js";
import * as GetGameObjectsUtils$Meta3dComponentGeometry from "./gameobject/GetGameObjectsUtils.bs.js";
import * as RemoveGeometryUtils$Meta3dComponentGeometry from "./gameobject/RemoveGeometryUtils.bs.js";
import * as DisposeGeometryUtils$Meta3dComponentGeometry from "./operate_component/DisposeGeometryUtils.bs.js";
import * as GetAllGeometrysUtils$Meta3dComponentGeometry from "./operate_component/GetAllGeometrysUtils.bs.js";
import * as GetGeometryDataUtils$Meta3dComponentGeometry from "./operate_data/GetGeometryDataUtils.bs.js";
import * as SetGeometryDataUtils$Meta3dComponentGeometry from "./operate_data/SetGeometryDataUtils.bs.js";
import * as GetNeedDisposedGeometrysUtils$Meta3dComponentGeometry from "./gameobject/GetNeedDisposedGeometrysUtils.bs.js";

function getContribute(param) {
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
          getAllComponentsFunc: GetAllGeometrysUtils$Meta3dComponentGeometry.getAll,
          restore: (function (currentState, targetState) {
              return targetState;
            }),
          deepCopy: (function (state) {
              return state;
            })
        };
}

export {
  getContribute ,
}
/* No side effect */
