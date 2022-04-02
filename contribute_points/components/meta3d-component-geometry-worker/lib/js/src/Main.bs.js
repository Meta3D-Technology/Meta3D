'use strict';

var Index$Meta3dComponentGeometryWorkerProtocol = require("meta3d-component-geometry-worker-protocol/lib/js/src/Index.bs.js");
var CreateStateUtils$Meta3dComponentGeometryWorker = require("./create_state/CreateStateUtils.bs.js");
var DefaultGetDataUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/DefaultGetDataUtils.bs.js");
var GetGeometryDataUtils$Meta3dComponentGeometryWorker = require("./operate_data/GetGeometryDataUtils.bs.js");

function getComponentContribute(param) {
  return {
          componentName: Index$Meta3dComponentGeometryWorkerProtocol.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$Meta3dComponentGeometryWorker.createState(param.isDebug, param.geometryPointCount, param.geometryCount, param.buffer);
            }),
          getGameObjectsFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.getGameObjectsFunc,
          createComponentFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.createComponentFunc,
          addComponentFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.addComponentFunc,
          removeComponentFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.removeComponentFunc,
          hasComponentFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.hasComponentFunc,
          getComponentFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.getComponentFunc,
          getNeedDisposedComponentsFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.getNeedDisposedComponentsFunc,
          getComponentDataFunc: (function (state, component, dataName) {
              return GetGeometryDataUtils$Meta3dComponentGeometryWorker.getData(state, component, dataName);
            }),
          setComponentDataFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.setComponentDataFunc,
          deferDisposeComponentFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.deferDisposeComponentFunc,
          disposeComponentsFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.disposeComponentsFunc,
          cloneComponentFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.cloneComponentFunc,
          getAllComponentsFunc: DefaultGetDataUtils$Meta3dComponentWorkerUtils.getAllComponentsFunc
        };
}

exports.getComponentContribute = getComponentContribute;
/* No side effect */
