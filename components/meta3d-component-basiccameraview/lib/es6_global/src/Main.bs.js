

import * as Index$Meta3dComponentBasiccameraviewProtocol from "./../../../../../node_modules/meta3d-component-basiccameraview-protocol/lib/es6_global/src/Index.bs.js";
import * as CreateStateUtils$Meta3dComponentBasiccameraview from "./create_state/CreateStateUtils.bs.js";
import * as GetGameObjectsUtils$Meta3dComponentBasiccameraview from "./gameobject/GetGameObjectsUtils.bs.js";
import * as AddBasicCameraViewUtils$Meta3dComponentBasiccameraview from "./gameobject/AddBasicCameraViewUtils.bs.js";
import * as GetBasicCameraViewUtils$Meta3dComponentBasiccameraview from "./gameobject/GetBasicCameraViewUtils.bs.js";
import * as HasBasicCameraViewUtils$Meta3dComponentBasiccameraview from "./gameobject/HasBasicCameraViewUtils.bs.js";
import * as CreateBasicCameraViewUtils$Meta3dComponentBasiccameraview from "./operate_component/CreateBasicCameraViewUtils.bs.js";
import * as GetAllBasicCameraViewsUtils$Meta3dComponentBasiccameraview from "./operate_component/GetAllBasicCameraViewsUtils.bs.js";
import * as GetBasicCameraViewDataUtils$Meta3dComponentBasiccameraview from "./operate_data/GetBasicCameraViewDataUtils.bs.js";
import * as SetBasicCameraViewDataUtils$Meta3dComponentBasiccameraview from "./operate_data/SetBasicCameraViewDataUtils.bs.js";

function getComponentContribute(param) {
  return {
          componentName: Index$Meta3dComponentBasiccameraviewProtocol.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$Meta3dComponentBasiccameraview.createState(param.isDebug);
            }),
          getGameObjectsFunc: GetGameObjectsUtils$Meta3dComponentBasiccameraview.get,
          createComponentFunc: CreateBasicCameraViewUtils$Meta3dComponentBasiccameraview.create,
          addComponentFunc: AddBasicCameraViewUtils$Meta3dComponentBasiccameraview.add,
          removeComponentFunc: (function (state, gameObject, transform) {
              return state;
            }),
          hasComponentFunc: HasBasicCameraViewUtils$Meta3dComponentBasiccameraview.has,
          getComponentFunc: GetBasicCameraViewUtils$Meta3dComponentBasiccameraview.get,
          getNeedDisposedComponentsFunc: (function (state) {
              return [];
            }),
          getComponentDataFunc: (function (state, component, dataName) {
              return GetBasicCameraViewDataUtils$Meta3dComponentBasiccameraview.getData(state, component, dataName);
            }),
          setComponentDataFunc: (function (state, component, dataName, dataValue) {
              return SetBasicCameraViewDataUtils$Meta3dComponentBasiccameraview.setData(state, component, dataName, dataValue);
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
          getAllComponentsFunc: GetAllBasicCameraViewsUtils$Meta3dComponentBasiccameraview.getAll
        };
}

export {
  getComponentContribute ,
  
}
/* No side effect */
