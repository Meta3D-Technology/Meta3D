

import * as Index$Meta3dComponentDirectionlightProtocol from "./../../../../../node_modules/meta3d-component-directionlight-protocol/lib/es6_global/src/Index.bs.js";
import * as CreateStateUtils$Meta3dComponentDirectionlight from "./create_state/CreateStateUtils.bs.js";
import * as GetGameObjectsUtils$Meta3dComponentDirectionlight from "./gameobject/GetGameObjectsUtils.bs.js";
import * as AddDirectionLightUtils$Meta3dComponentDirectionlight from "./gameobject/AddDirectionLightUtils.bs.js";
import * as GetDirectionLightUtils$Meta3dComponentDirectionlight from "./gameobject/GetDirectionLightUtils.bs.js";
import * as HasDirectionLightUtils$Meta3dComponentDirectionlight from "./gameobject/HasDirectionLightUtils.bs.js";
import * as CreateDirectionLightUtils$Meta3dComponentDirectionlight from "./operate_component/CreateDirectionLightUtils.bs.js";
import * as GetAllDirectionLightsUtils$Meta3dComponentDirectionlight from "./operate_component/GetAllDirectionLightsUtils.bs.js";
import * as GetDirectionLightDataUtils$Meta3dComponentDirectionlight from "./operate_data/GetDirectionLightDataUtils.bs.js";
import * as SetDirectionLightDataUtils$Meta3dComponentDirectionlight from "./operate_data/SetDirectionLightDataUtils.bs.js";

function getComponentContribute(param) {
  return {
          componentName: Index$Meta3dComponentDirectionlightProtocol.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$Meta3dComponentDirectionlight.createState(param.isDebug, param.directionLightCount);
            }),
          getGameObjectsFunc: GetGameObjectsUtils$Meta3dComponentDirectionlight.get,
          createComponentFunc: CreateDirectionLightUtils$Meta3dComponentDirectionlight.create,
          addComponentFunc: AddDirectionLightUtils$Meta3dComponentDirectionlight.add,
          removeComponentFunc: (function (state, gameObject, transform) {
              return state;
            }),
          hasComponentFunc: HasDirectionLightUtils$Meta3dComponentDirectionlight.has,
          getComponentFunc: GetDirectionLightUtils$Meta3dComponentDirectionlight.get,
          getNeedDisposedComponentsFunc: (function (state) {
              return [];
            }),
          getComponentDataFunc: (function (state, component, dataName) {
              return GetDirectionLightDataUtils$Meta3dComponentDirectionlight.getData(state, component, dataName);
            }),
          setComponentDataFunc: (function (state, component, dataName, dataValue) {
              return SetDirectionLightDataUtils$Meta3dComponentDirectionlight.setData(state, component, dataName, dataValue);
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
          getAllComponentsFunc: GetAllDirectionLightsUtils$Meta3dComponentDirectionlight.getAll
        };
}

export {
  getComponentContribute ,
  
}
/* No side effect */
