

import * as Index$Meta3dComponentArcballcameracontrollerProtocol from "./../../../../../node_modules/meta3d-component-arcballcameracontroller-protocol/lib/es6_global/src/Index.bs.js";
import * as CreateStateUtils$Meta3dComponentArcballcameracontroller from "./create_state/CreateStateUtils.bs.js";
import * as GetGameObjectsUtils$Meta3dComponentArcballcameracontroller from "./gameobject/GetGameObjectsUtils.bs.js";
import * as AddArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller from "./gameobject/AddArcballCameraControllerUtils.bs.js";
import * as GetArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller from "./gameobject/GetArcballCameraControllerUtils.bs.js";
import * as HasArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller from "./gameobject/HasArcballCameraControllerUtils.bs.js";
import * as CreateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller from "./operate_component/CreateArcballCameraControllerUtils.bs.js";
import * as GetAllArcballCameraControllersUtils$Meta3dComponentArcballcameracontroller from "./operate_component/GetAllArcballCameraControllersUtils.bs.js";
import * as GetArcballCameraControllerDataUtils$Meta3dComponentArcballcameracontroller from "./operate_data/GetArcballCameraControllerDataUtils.bs.js";
import * as SetArcballCameraControllerDataUtils$Meta3dComponentArcballcameracontroller from "./operate_data/SetArcballCameraControllerDataUtils.bs.js";

function getComponentContribute(param) {
  return {
          componentName: Index$Meta3dComponentArcballcameracontrollerProtocol.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$Meta3dComponentArcballcameracontroller.createState(param.isDebug);
            }),
          getGameObjectsFunc: GetGameObjectsUtils$Meta3dComponentArcballcameracontroller.get,
          createComponentFunc: CreateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.create,
          addComponentFunc: AddArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.add,
          removeComponentFunc: (function (state, gameObject, transform) {
              return state;
            }),
          hasComponentFunc: HasArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.has,
          getComponentFunc: GetArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.get,
          getNeedDisposedComponentsFunc: (function (state) {
              return [];
            }),
          getComponentDataFunc: (function (state, component, dataName) {
              return GetArcballCameraControllerDataUtils$Meta3dComponentArcballcameracontroller.getData(state, component, dataName);
            }),
          setComponentDataFunc: (function (state, component, dataName, dataValue) {
              return SetArcballCameraControllerDataUtils$Meta3dComponentArcballcameracontroller.setData(state, component, dataName, dataValue);
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
          getAllComponentsFunc: GetAllArcballCameraControllersUtils$Meta3dComponentArcballcameracontroller.getAll
        };
}

export {
  getComponentContribute ,
  
}
/* No side effect */
