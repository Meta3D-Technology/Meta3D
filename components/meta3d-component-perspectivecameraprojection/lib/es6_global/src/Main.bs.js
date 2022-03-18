

import * as Index$Meta3dComponentPerspectivecameraprojectionProtocol from "./../../../../../node_modules/meta3d-component-perspectivecameraprojection-protocol/lib/es6_global/src/Index.bs.js";
import * as CreateStateUtils$Meta3dComponentPerspectivecameraprojection from "./create_state/CreateStateUtils.bs.js";
import * as GetGameObjectsUtils$Meta3dComponentPerspectivecameraprojection from "./gameobject/GetGameObjectsUtils.bs.js";
import * as AddPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection from "./gameobject/AddPerspectiveCameraProjectionUtils.bs.js";
import * as GetPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection from "./gameobject/GetPerspectiveCameraProjectionUtils.bs.js";
import * as HasPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection from "./gameobject/HasPerspectiveCameraProjectionUtils.bs.js";
import * as CreatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection from "./operate_component/CreatePerspectiveCameraProjectionUtils.bs.js";
import * as GetAllPerspectiveCameraProjectionsUtils$Meta3dComponentPerspectivecameraprojection from "./operate_component/GetAllPerspectiveCameraProjectionsUtils.bs.js";
import * as GetPerspectiveCameraProjectionDataUtils$Meta3dComponentPerspectivecameraprojection from "./operate_data/GetPerspectiveCameraProjectionDataUtils.bs.js";
import * as SetPerspectiveCameraProjectionDataUtils$Meta3dComponentPerspectivecameraprojection from "./operate_data/SetPerspectiveCameraProjectionDataUtils.bs.js";

function getComponentContribute(param) {
  return {
          componentName: Index$Meta3dComponentPerspectivecameraprojectionProtocol.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$Meta3dComponentPerspectivecameraprojection.createState(param.isDebug);
            }),
          getGameObjectsFunc: GetGameObjectsUtils$Meta3dComponentPerspectivecameraprojection.get,
          createComponentFunc: CreatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.create,
          addComponentFunc: AddPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.add,
          removeComponentFunc: (function (state, gameObject, transform) {
              return state;
            }),
          hasComponentFunc: HasPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.has,
          getComponentFunc: GetPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.get,
          getNeedDisposedComponentsFunc: (function (state) {
              return [];
            }),
          getComponentDataFunc: (function (state, component, dataName) {
              return GetPerspectiveCameraProjectionDataUtils$Meta3dComponentPerspectivecameraprojection.getData(state, component, dataName);
            }),
          setComponentDataFunc: (function (state, component, dataName, dataValue) {
              return SetPerspectiveCameraProjectionDataUtils$Meta3dComponentPerspectivecameraprojection.setData(state, component, dataName, dataValue);
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
          getAllComponentsFunc: GetAllPerspectiveCameraProjectionsUtils$Meta3dComponentPerspectivecameraprojection.getAll
        };
}

export {
  getComponentContribute ,
  
}
/* No side effect */
