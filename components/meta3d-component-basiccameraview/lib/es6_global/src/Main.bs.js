

import * as Index$Meta3dComponentBasiccameraviewProtocol from "./../../../../meta3d-component-basiccameraview-protocol/lib/es6_global/src/Index.bs.js";
import * as CreateStateUtils$Meta3dComponentBasiccameraview from "./create_state/CreateStateUtils.bs.js";
import * as GetGameObjectsUtils$Meta3dComponentBasiccameraview from "./gameobject/GetGameObjectsUtils.bs.js";
import * as AddBasicCameraViewUtils$Meta3dComponentBasiccameraview from "./gameobject/AddBasicCameraViewUtils.bs.js";
import * as GetBasicCameraViewUtils$Meta3dComponentBasiccameraview from "./gameobject/GetBasicCameraViewUtils.bs.js";
import * as HasBasicCameraViewUtils$Meta3dComponentBasiccameraview from "./gameobject/HasBasicCameraViewUtils.bs.js";
import * as CloneBasicCameraViewUtils$Meta3dComponentBasiccameraview from "./operate_component/CloneBasicCameraViewUtils.bs.js";
import * as CreateBasicCameraViewUtils$Meta3dComponentBasiccameraview from "./operate_component/CreateBasicCameraViewUtils.bs.js";
import * as RemoveBasicCameraViewUtils$Meta3dComponentBasiccameraview from "./gameobject/RemoveBasicCameraViewUtils.bs.js";
import * as DisposeBasicCameraViewUtils$Meta3dComponentBasiccameraview from "./operate_component/DisposeBasicCameraViewUtils.bs.js";
import * as GetAllBasicCameraViewsUtils$Meta3dComponentBasiccameraview from "./operate_component/GetAllBasicCameraViewsUtils.bs.js";
import * as GetBasicCameraViewDataUtils$Meta3dComponentBasiccameraview from "./operate_data/GetBasicCameraViewDataUtils.bs.js";
import * as SetBasicCameraViewDataUtils$Meta3dComponentBasiccameraview from "./operate_data/SetBasicCameraViewDataUtils.bs.js";
import * as GetNeedDisposedBasicCameraViewsUtils$Meta3dComponentBasiccameraview from "./gameobject/GetNeedDisposedBasicCameraViewsUtils.bs.js";

function getComponentContribute(param) {
  return {
          componentName: Index$Meta3dComponentBasiccameraviewProtocol.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$Meta3dComponentBasiccameraview.createState(param.isDebug);
            }),
          getGameObjectsFunc: GetGameObjectsUtils$Meta3dComponentBasiccameraview.get,
          createComponentFunc: CreateBasicCameraViewUtils$Meta3dComponentBasiccameraview.create,
          addComponentFunc: AddBasicCameraViewUtils$Meta3dComponentBasiccameraview.add,
          removeComponentFunc: RemoveBasicCameraViewUtils$Meta3dComponentBasiccameraview.remove,
          hasComponentFunc: HasBasicCameraViewUtils$Meta3dComponentBasiccameraview.has,
          getComponentFunc: GetBasicCameraViewUtils$Meta3dComponentBasiccameraview.get,
          getNeedDisposedComponentsFunc: GetNeedDisposedBasicCameraViewsUtils$Meta3dComponentBasiccameraview.get,
          getComponentDataFunc: (function (state, cameraView, dataName) {
              return GetBasicCameraViewDataUtils$Meta3dComponentBasiccameraview.getData(state, cameraView, dataName);
            }),
          setComponentDataFunc: (function (state, cameraView, dataName, dataValue) {
              return SetBasicCameraViewDataUtils$Meta3dComponentBasiccameraview.setData(state, cameraView, dataName, dataValue);
            }),
          deferDisposeComponentFunc: DisposeBasicCameraViewUtils$Meta3dComponentBasiccameraview.deferDisposeComponent,
          disposeComponentsFunc: DisposeBasicCameraViewUtils$Meta3dComponentBasiccameraview.disposeComponents,
          cloneComponentFunc: (function (state, countRange, param, sourceBasicCameraView) {
              return CloneBasicCameraViewUtils$Meta3dComponentBasiccameraview.clone(state, countRange, sourceBasicCameraView);
            }),
          getAllComponentsFunc: GetAllBasicCameraViewsUtils$Meta3dComponentBasiccameraview.getAll
        };
}

export {
  getComponentContribute ,
  
}
/* No side effect */
