

import * as Index$Meta3dComponentGeometryProtocol from "./../../../../../node_modules/meta3d-component-geometry-protocol/lib/es6_global/src/Index.bs.js";
import * as AddGeometryUtils$Meta3dComponentGeometry from "./gameobject/AddGeometryUtils.bs.js";
import * as CreateStateUtils$Meta3dComponentGeometry from "./create_state/CreateStateUtils.bs.js";
import * as GetGeometryUtils$Meta3dComponentGeometry from "./gameobject/GetGeometryUtils.bs.js";
import * as HasGeometryUtils$Meta3dComponentGeometry from "./gameobject/HasGeometryUtils.bs.js";
import * as CreateGeometryUtils$Meta3dComponentGeometry from "./operate_component/CreateGeometryUtils.bs.js";
import * as GetGameObjectsUtils$Meta3dComponentGeometry from "./gameobject/GetGameObjectsUtils.bs.js";
import * as GetAllGeometrysUtils$Meta3dComponentGeometry from "./operate_component/GetAllGeometrysUtils.bs.js";
import * as GetGeometryDataUtils$Meta3dComponentGeometry from "./operate_data/GetGeometryDataUtils.bs.js";
import * as SetGeometryDataUtils$Meta3dComponentGeometry from "./operate_data/SetGeometryDataUtils.bs.js";

function getData(param) {
  return {
          componentName: Index$Meta3dComponentGeometryProtocol.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$Meta3dComponentGeometry.createState(param.isDebug, param.geometryPointCount, param.geometryCount);
            }),
          getGameObjectsFunc: GetGameObjectsUtils$Meta3dComponentGeometry.get,
          createComponentFunc: CreateGeometryUtils$Meta3dComponentGeometry.create,
          addComponentFunc: AddGeometryUtils$Meta3dComponentGeometry.add,
          hasComponentFunc: HasGeometryUtils$Meta3dComponentGeometry.has,
          getComponentFunc: GetGeometryUtils$Meta3dComponentGeometry.get,
          getComponentDataFunc: (function (state, component, dataName) {
              return GetGeometryDataUtils$Meta3dComponentGeometry.getData(state, component, dataName);
            }),
          setComponentDataFunc: (function (state, component, dataName, dataValue) {
              return SetGeometryDataUtils$Meta3dComponentGeometry.setData(state, component, dataName, dataValue);
            }),
          deferDisposeComponentFunc: (function (state, component) {
              return state;
            }),
          batchDisposeComponentsFunc: (function (state, components) {
              return state;
            }),
          getAllComponentsFunc: GetAllGeometrysUtils$Meta3dComponentGeometry.getAll
        };
}

export {
  getData ,
  
}
/* No side effect */
