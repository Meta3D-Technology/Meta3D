

import * as Index$Meta3dComponentTransformProtocol from "../../../../../node_modules/meta3d-component-transform-protocol/lib/es6_global/src/Index.bs.js";
import * as CreateStateUtils$Meta3dComponentTransform from "./create_state/CreateStateUtils.bs.js";
import * as AddTransformUtils$Meta3dComponentTransform from "./gameobject/AddTransformUtils.bs.js";
import * as GetTransformUtils$Meta3dComponentTransform from "./gameobject/GetTransformUtils.bs.js";
import * as HasTransformUtils$Meta3dComponentTransform from "./gameobject/HasTransformUtils.bs.js";
import * as CloneTransformUtils$Meta3dComponentTransform from "./operate_component/CloneTransformUtils.bs.js";
import * as GetGameObjectsUtils$Meta3dComponentTransform from "./gameobject/GetGameObjectsUtils.bs.js";
import * as CreateTransformUtils$Meta3dComponentTransform from "./operate_component/CreateTransformUtils.bs.js";
import * as RemoveTransformUtils$Meta3dComponentTransform from "./gameobject/RemoveTransformUtils.bs.js";
import * as DisposeTransformUtils$Meta3dComponentTransform from "./operate_component/DisposeTransformUtils.bs.js";
import * as GetAllTransformsUtils$Meta3dComponentTransform from "./operate_component/GetAllTransformsUtils.bs.js";
import * as GetTransformDataUtils$Meta3dComponentTransform from "./operate_data/GetTransformDataUtils.bs.js";
import * as SetTransformDataUtils$Meta3dComponentTransform from "./operate_data/SetTransformDataUtils.bs.js";
import * as GetNeedDisposedTransformsUtils$Meta3dComponentTransform from "./gameobject/GetNeedDisposedTransformsUtils.bs.js";

function getContribute(param, param$1) {
  return {
          componentName: Index$Meta3dComponentTransformProtocol.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$Meta3dComponentTransform.createState(param.isDebug, param.transformCount, param.float9Array1, param.float32Array1);
            }),
          getGameObjectsFunc: (function (state, transform) {
              return GetGameObjectsUtils$Meta3dComponentTransform.get(state)(transform);
            }),
          createComponentFunc: CreateTransformUtils$Meta3dComponentTransform.create,
          addComponentFunc: (function (state, gameObject, transform) {
              return AddTransformUtils$Meta3dComponentTransform.add(state)(gameObject, transform);
            }),
          removeComponentFunc: (function (state, gameObject, transform) {
              return RemoveTransformUtils$Meta3dComponentTransform.remove(state)(gameObject, transform);
            }),
          hasComponentFunc: (function (state, gameObject) {
              return HasTransformUtils$Meta3dComponentTransform.has(state)(gameObject);
            }),
          getComponentFunc: (function (state, gameObject) {
              return GetTransformUtils$Meta3dComponentTransform.get(state)(gameObject);
            }),
          getNeedDisposedComponentsFunc: GetNeedDisposedTransformsUtils$Meta3dComponentTransform.get,
          getComponentDataFunc: (function (state, transform, dataName) {
              return GetTransformDataUtils$Meta3dComponentTransform.getData(state, transform, dataName);
            }),
          setComponentDataFunc: (function (state, transform, dataName, dataValue) {
              return SetTransformDataUtils$Meta3dComponentTransform.setData(state, transform, dataName, dataValue);
            }),
          deferDisposeComponentFunc: (function (state, transformData) {
              return DisposeTransformUtils$Meta3dComponentTransform.deferDisposeComponent(state)(transformData);
            }),
          disposeComponentsFunc: (function (state, transforms) {
              return DisposeTransformUtils$Meta3dComponentTransform.disposeComponents(state)(transforms);
            }),
          cloneComponentFunc: (function (state, countRange, param, sourceTransform) {
              return CloneTransformUtils$Meta3dComponentTransform.clone(state, countRange, sourceTransform);
            }),
          getAllComponentsFunc: GetAllTransformsUtils$Meta3dComponentTransform.getAll
        };
}

export {
  getContribute ,
}
/* No side effect */
