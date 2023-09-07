

import * as Index$Meta3dComponentPbrmaterialProtocol from "./../../../../../node_modules/meta3d-component-pbrmaterial-protocol/lib/es6_global/src/Index.bs.js";
import * as CreateStateUtils$Meta3dComponentPbrmaterial from "./create_state/CreateStateUtils.bs.js";
import * as AddPBRMaterialUtils$Meta3dComponentPbrmaterial from "./gameobject/AddPBRMaterialUtils.bs.js";
import * as GetGameObjectsUtils$Meta3dComponentPbrmaterial from "./gameobject/GetGameObjectsUtils.bs.js";
import * as GetPBRMaterialUtils$Meta3dComponentPbrmaterial from "./gameobject/GetPBRMaterialUtils.bs.js";
import * as HasPBRMaterialUtils$Meta3dComponentPbrmaterial from "./gameobject/HasPBRMaterialUtils.bs.js";
import * as ClonePBRMaterialUtils$Meta3dComponentPbrmaterial from "./operate_component/ClonePBRMaterialUtils.bs.js";
import * as CreatePBRMaterialUtils$Meta3dComponentPbrmaterial from "./operate_component/CreatePBRMaterialUtils.bs.js";
import * as RemovePBRMaterialUtils$Meta3dComponentPbrmaterial from "./gameobject/RemovePBRMaterialUtils.bs.js";
import * as DisposePBRMaterialUtils$Meta3dComponentPbrmaterial from "./operate_component/DisposePBRMaterialUtils.bs.js";
import * as GetAllPBRMaterialsUtils$Meta3dComponentPbrmaterial from "./operate_component/GetAllPBRMaterialsUtils.bs.js";
import * as GetPBRMaterialDataUtils$Meta3dComponentPbrmaterial from "./operate_data/GetPBRMaterialDataUtils.bs.js";
import * as SetPBRMaterialDataUtils$Meta3dComponentPbrmaterial from "./operate_data/SetPBRMaterialDataUtils.bs.js";
import * as GetNeedDisposedPBRMaterialsUtils$Meta3dComponentPbrmaterial from "./gameobject/GetNeedDisposedPBRMaterialsUtils.bs.js";

function getContribute(param) {
  return {
          componentName: Index$Meta3dComponentPbrmaterialProtocol.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$Meta3dComponentPbrmaterial.createState(param.isDebug, param.pbrMaterialCount);
            }),
          getGameObjectsFunc: (function (state, material) {
              return GetGameObjectsUtils$Meta3dComponentPbrmaterial.get(state)(material);
            }),
          createComponentFunc: CreatePBRMaterialUtils$Meta3dComponentPbrmaterial.create,
          addComponentFunc: (function (state, gameObject, material) {
              return AddPBRMaterialUtils$Meta3dComponentPbrmaterial.add(state)(gameObject, material);
            }),
          removeComponentFunc: (function (state, gameObject, material) {
              return RemovePBRMaterialUtils$Meta3dComponentPbrmaterial.remove(state)(gameObject, material);
            }),
          hasComponentFunc: (function (state, gameObject) {
              return HasPBRMaterialUtils$Meta3dComponentPbrmaterial.has(state)(gameObject);
            }),
          getComponentFunc: (function (state, gameObject) {
              return GetPBRMaterialUtils$Meta3dComponentPbrmaterial.get(state)(gameObject);
            }),
          getNeedDisposedComponentsFunc: GetNeedDisposedPBRMaterialsUtils$Meta3dComponentPbrmaterial.get,
          getComponentDataFunc: (function (state, material, dataName) {
              return GetPBRMaterialDataUtils$Meta3dComponentPbrmaterial.getData(state, material, dataName);
            }),
          setComponentDataFunc: (function (state, material, dataName, dataValue) {
              return SetPBRMaterialDataUtils$Meta3dComponentPbrmaterial.setData(state, material, dataName, dataValue);
            }),
          deferDisposeComponentFunc: (function (state, param) {
              return DisposePBRMaterialUtils$Meta3dComponentPbrmaterial.deferDisposeComponent(state)([
                          param[0],
                          param[1]
                        ]);
            }),
          disposeComponentsFunc: DisposePBRMaterialUtils$Meta3dComponentPbrmaterial.disposeComponents,
          cloneComponentFunc: ClonePBRMaterialUtils$Meta3dComponentPbrmaterial.clone,
          getAllComponentsFunc: GetAllPBRMaterialsUtils$Meta3dComponentPbrmaterial.getAll
        };
}

export {
  getContribute ,
}
/* No side effect */
