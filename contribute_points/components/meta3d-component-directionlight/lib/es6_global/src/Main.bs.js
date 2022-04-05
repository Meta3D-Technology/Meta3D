

import * as Index$Meta3dComponentDirectionlightProtocol from "./../../../../../../node_modules/meta3d-component-directionlight-protocol/lib/es6_global/src/Index.bs.js";
import * as CreateStateUtils$Meta3dComponentDirectionlight from "./create_state/CreateStateUtils.bs.js";
import * as GetGameObjectsUtils$Meta3dComponentDirectionlight from "./gameobject/GetGameObjectsUtils.bs.js";
import * as AddDirectionLightUtils$Meta3dComponentDirectionlight from "./gameobject/AddDirectionLightUtils.bs.js";
import * as GetDirectionLightUtils$Meta3dComponentDirectionlight from "./gameobject/GetDirectionLightUtils.bs.js";
import * as HasDirectionLightUtils$Meta3dComponentDirectionlight from "./gameobject/HasDirectionLightUtils.bs.js";
import * as CloneDirectionLightUtils$Meta3dComponentDirectionlight from "./operate_component/CloneDirectionLightUtils.bs.js";
import * as CreateDirectionLightUtils$Meta3dComponentDirectionlight from "./operate_component/CreateDirectionLightUtils.bs.js";
import * as RemoveDirectionLightUtils$Meta3dComponentDirectionlight from "./gameobject/RemoveDirectionLightUtils.bs.js";
import * as DisposeDirectionLightUtils$Meta3dComponentDirectionlight from "./operate_component/DisposeDirectionLightUtils.bs.js";
import * as GetAllDirectionLightsUtils$Meta3dComponentDirectionlight from "./operate_component/GetAllDirectionLightsUtils.bs.js";
import * as GetDirectionLightDataUtils$Meta3dComponentDirectionlight from "./operate_data/GetDirectionLightDataUtils.bs.js";
import * as SetDirectionLightDataUtils$Meta3dComponentDirectionlight from "./operate_data/SetDirectionLightDataUtils.bs.js";
import * as GetNeedDisposedDirectionLightsUtils$Meta3dComponentDirectionlight from "./gameobject/GetNeedDisposedDirectionLightsUtils.bs.js";

function getComponentContribute(param) {
  return {
          componentName: Index$Meta3dComponentDirectionlightProtocol.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$Meta3dComponentDirectionlight.createState(param.isDebug, param.directionLightCount);
            }),
          getGameObjectsFunc: (function (state, light) {
              return GetGameObjectsUtils$Meta3dComponentDirectionlight.get(state)(light);
            }),
          createComponentFunc: CreateDirectionLightUtils$Meta3dComponentDirectionlight.create,
          addComponentFunc: (function (state, gameObject, light) {
              return AddDirectionLightUtils$Meta3dComponentDirectionlight.add(state)(gameObject, light);
            }),
          removeComponentFunc: (function (state, gameObject, light) {
              return RemoveDirectionLightUtils$Meta3dComponentDirectionlight.remove(state)(gameObject, light);
            }),
          hasComponentFunc: HasDirectionLightUtils$Meta3dComponentDirectionlight.has,
          getComponentFunc: GetDirectionLightUtils$Meta3dComponentDirectionlight.get,
          getNeedDisposedComponentsFunc: GetNeedDisposedDirectionLightsUtils$Meta3dComponentDirectionlight.get,
          getComponentDataFunc: (function (state, light, dataName) {
              return GetDirectionLightDataUtils$Meta3dComponentDirectionlight.getData(state, light, dataName);
            }),
          setComponentDataFunc: (function (state, light, dataName, dataValue) {
              return SetDirectionLightDataUtils$Meta3dComponentDirectionlight.setData(state, light, dataName, dataValue);
            }),
          deferDisposeComponentFunc: (function (state, lightData) {
              return DisposeDirectionLightUtils$Meta3dComponentDirectionlight.deferDisposeComponent(state)(lightData);
            }),
          disposeComponentsFunc: (function (state, lights) {
              return DisposeDirectionLightUtils$Meta3dComponentDirectionlight.disposeComponents(state)(lights);
            }),
          cloneComponentFunc: (function (state, countRange, param, sourceDirectionLight) {
              return CloneDirectionLightUtils$Meta3dComponentDirectionlight.clone(state, countRange, sourceDirectionLight);
            }),
          getAllComponentsFunc: GetAllDirectionLightsUtils$Meta3dComponentDirectionlight.getAll
        };
}

export {
  getComponentContribute ,
  
}
/* No side effect */
