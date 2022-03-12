

import * as Index$Meta3dComponentPbrmaterialProtocol from "./../../../../../node_modules/meta3d-component-pbrmaterial-protocol/lib/es6_global/src/Index.bs.js";
import * as CreateStateUtils$Meta3dComponentPbrmaterial from "./create_state/CreateStateUtils.bs.js";
import * as AddPBRMaterialUtils$Meta3dComponentPbrmaterial from "./gameobject/AddPBRMaterialUtils.bs.js";
import * as GetGameObjectsUtils$Meta3dComponentPbrmaterial from "./gameobject/GetGameObjectsUtils.bs.js";
import * as GetPBRMaterialUtils$Meta3dComponentPbrmaterial from "./gameobject/GetPBRMaterialUtils.bs.js";
import * as HasPBRMaterialUtils$Meta3dComponentPbrmaterial from "./gameobject/HasPBRMaterialUtils.bs.js";
import * as GetPBRMaterialsUtils$Meta3dComponentPbrmaterial from "./gameobject/GetPBRMaterialsUtils.bs.js";
import * as CreatePBRMaterialUtils$Meta3dComponentPbrmaterial from "./operate_component/CreatePBRMaterialUtils.bs.js";
import * as RemovePBRMaterialUtils$Meta3dComponentPbrmaterial from "./gameobject/RemovePBRMaterialUtils.bs.js";
import * as DisposePBRMaterialUtils$Meta3dComponentPbrmaterial from "./operate_data/DisposePBRMaterialUtils.bs.js";
import * as GetAllPBRMaterialsUtils$Meta3dComponentPbrmaterial from "./operate_component/GetAllPBRMaterialsUtils.bs.js";
import * as GetPBRMaterialDataUtils$Meta3dComponentPbrmaterial from "./operate_data/GetPBRMaterialDataUtils.bs.js";
import * as SetPBRMaterialDataUtils$Meta3dComponentPbrmaterial from "./operate_data/SetPBRMaterialDataUtils.bs.js";
import * as GetNeedDisposedPBRMaterialsUtils$Meta3dComponentPbrmaterial from "./gameobject/GetNeedDisposedPBRMaterialsUtils.bs.js";

function getComponentContribute(param) {
  return {
          componentName: Index$Meta3dComponentPbrmaterialProtocol.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$Meta3dComponentPbrmaterial.createState(param.isDebug, param.pbrMaterialCount);
            }),
          getGameObjectsFunc: (function (state, component) {
              return GetGameObjectsUtils$Meta3dComponentPbrmaterial.get(state)(component);
            }),
          createComponentFunc: CreatePBRMaterialUtils$Meta3dComponentPbrmaterial.create,
          addComponentFunc: (function (state, gameObject, component) {
              return AddPBRMaterialUtils$Meta3dComponentPbrmaterial.add(state)(gameObject, component);
            }),
          removeComponentFunc: (function (state, gameObject, component) {
              return RemovePBRMaterialUtils$Meta3dComponentPbrmaterial.remove(state)(gameObject, component);
            }),
          hasComponentFunc: (function (state, gameObject) {
              return HasPBRMaterialUtils$Meta3dComponentPbrmaterial.has(state)(gameObject);
            }),
          getComponentFunc: (function (state, gameObject) {
              return GetPBRMaterialUtils$Meta3dComponentPbrmaterial.get(state)(gameObject);
            }),
          getComponentsFunc: (function (state, gameObjects) {
              return GetPBRMaterialsUtils$Meta3dComponentPbrmaterial.get(state)(gameObjects);
            }),
          getNeedDisposedComponentsFunc: GetNeedDisposedPBRMaterialsUtils$Meta3dComponentPbrmaterial.get,
          getComponentDataFunc: (function (state, component, dataName) {
              return GetPBRMaterialDataUtils$Meta3dComponentPbrmaterial.getData(state, component, dataName);
            }),
          setComponentDataFunc: (function (state, component, dataName, dataValue) {
              return SetPBRMaterialDataUtils$Meta3dComponentPbrmaterial.setData(state, component, dataName, dataValue);
            }),
          deferDisposeComponentFunc: (function (state, param) {
              return DisposePBRMaterialUtils$Meta3dComponentPbrmaterial.deferDisposeComponent(state)([
                          param[0],
                          param[1]
                        ]);
            }),
          disposeComponentsFunc: (function (state, components) {
              return state;
            }),
          getAllComponentsFunc: GetAllPBRMaterialsUtils$Meta3dComponentPbrmaterial.getAll
        };
}

export {
  getComponentContribute ,
  
}
/* No side effect */
