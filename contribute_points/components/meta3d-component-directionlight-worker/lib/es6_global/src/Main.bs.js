

import * as DefaultGetDataUtils$Meta3dComponentWorkerUtils from "./../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/DefaultGetDataUtils.bs.js";
import * as Index$Meta3dComponentDirectionlightWorkerProtocol from "./../../../../../node_modules/meta3d-component-directionlight-worker-protocol/lib/es6_global/src/Index.bs.js";
import * as CreateStateUtils$Meta3dComponentDirectionlightWorker from "./create_state/CreateStateUtils.bs.js";
import * as GetDirectionLightDataUtils$Meta3dComponentDirectionlightWorker from "./operate_data/GetDirectionLightDataUtils.bs.js";

function getComponentContribute(param) {
  return {
          componentName: Index$Meta3dComponentDirectionlightWorkerProtocol.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$Meta3dComponentDirectionlightWorker.createState(param.isDebug, param.directionLightCount, param.buffer);
            }),
          getGameObjectsFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.getGameObjectsFunc,
          createComponentFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.createComponentFunc,
          addComponentFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.addComponentFunc,
          removeComponentFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.removeComponentFunc,
          hasComponentFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.hasComponentFunc,
          getComponentFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.getComponentFunc,
          getNeedDisposedComponentsFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.getNeedDisposedComponentsFunc,
          getComponentDataFunc: (function (state, component, dataName) {
              return GetDirectionLightDataUtils$Meta3dComponentDirectionlightWorker.getData(state, component, dataName);
            }),
          setComponentDataFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.setComponentDataFunc,
          deferDisposeComponentFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.deferDisposeComponentFunc,
          disposeComponentsFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.disposeComponentsFunc,
          cloneComponentFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.cloneComponentFunc,
          getAllComponentsFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.getAllComponentsFunc
        };
}

export {
  getComponentContribute ,
  
}
/* No side effect */
