

import * as ArraySt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as Index$Meta3dComponentPerspectivecameraprojectionProtocol from "../../../../../node_modules/meta3d-component-perspectivecameraprojection-protocol/lib/es6_global/src/Index.bs.js";
import * as CreateStateUtils$Meta3dComponentPerspectivecameraprojection from "./create_state/CreateStateUtils.bs.js";
import * as GetGameObjectsUtils$Meta3dComponentPerspectivecameraprojection from "./gameobject/GetGameObjectsUtils.bs.js";
import * as AddPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection from "./gameobject/AddPerspectiveCameraProjectionUtils.bs.js";
import * as GetPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection from "./gameobject/GetPerspectiveCameraProjectionUtils.bs.js";
import * as HasPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection from "./gameobject/HasPerspectiveCameraProjectionUtils.bs.js";
import * as ClonePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection from "./operate_component/ClonePerspectiveCameraProjectionUtils.bs.js";
import * as CreatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection from "./operate_component/CreatePerspectiveCameraProjectionUtils.bs.js";
import * as RemovePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection from "./gameobject/RemovePerspectiveCameraProjectionUtils.bs.js";
import * as DisposePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection from "./operate_component/DisposePerspectiveCameraProjectionUtils.bs.js";
import * as GetAllPerspectiveCameraProjectionsUtils$Meta3dComponentPerspectivecameraprojection from "./operate_component/GetAllPerspectiveCameraProjectionsUtils.bs.js";
import * as GetPerspectiveCameraProjectionDataUtils$Meta3dComponentPerspectivecameraprojection from "./operate_data/GetPerspectiveCameraProjectionDataUtils.bs.js";
import * as SetPerspectiveCameraProjectionDataUtils$Meta3dComponentPerspectivecameraprojection from "./operate_data/SetPerspectiveCameraProjectionDataUtils.bs.js";
import * as GetNeedDisposedPerspectiveCameraProjectionsUtils$Meta3dComponentPerspectivecameraprojection from "./gameobject/GetNeedDisposedPerspectiveCameraProjectionsUtils.bs.js";

function getContribute(param) {
  return {
          componentName: Index$Meta3dComponentPerspectivecameraprojectionProtocol.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$Meta3dComponentPerspectivecameraprojection.createState(param.isDebug);
            }),
          getGameObjectsFunc: GetGameObjectsUtils$Meta3dComponentPerspectivecameraprojection.get,
          createComponentFunc: CreatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.create,
          addComponentFunc: AddPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.add,
          removeComponentFunc: RemovePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.remove,
          hasComponentFunc: HasPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.has,
          getComponentFunc: GetPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.get,
          getNeedDisposedComponentsFunc: GetNeedDisposedPerspectiveCameraProjectionsUtils$Meta3dComponentPerspectivecameraprojection.get,
          getComponentDataFunc: (function (state, cameraProjection, dataName) {
              return GetPerspectiveCameraProjectionDataUtils$Meta3dComponentPerspectivecameraprojection.getData(state, cameraProjection, dataName);
            }),
          setComponentDataFunc: (function (state, cameraProjection, dataName, dataValue) {
              return SetPerspectiveCameraProjectionDataUtils$Meta3dComponentPerspectivecameraprojection.setData(state, cameraProjection, dataName, dataValue);
            }),
          deferDisposeComponentFunc: DisposePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.deferDisposeComponent,
          disposeComponentsFunc: DisposePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.disposeComponents,
          cloneComponentFunc: (function (state, countRange, param, sourcePerspectiveCameraProjection) {
              return ClonePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.clone(state, countRange, sourcePerspectiveCameraProjection);
            }),
          getAllComponentsFunc: GetAllPerspectiveCameraProjectionsUtils$Meta3dComponentPerspectivecameraprojection.getAll,
          restore: (function (currentState, targetState) {
              return targetState;
            }),
          deepCopy: (function (state) {
              return {
                      config: state.config,
                      maxIndex: state.maxIndex,
                      dirtyMap: MutableSparseMap$Meta3dCommonlib.copy(state.dirtyMap),
                      pMatrixMap: MutableSparseMap$Meta3dCommonlib.copy(state.pMatrixMap),
                      nearMap: MutableSparseMap$Meta3dCommonlib.copy(state.nearMap),
                      farMap: MutableSparseMap$Meta3dCommonlib.copy(state.farMap),
                      fovyMap: MutableSparseMap$Meta3dCommonlib.copy(state.fovyMap),
                      aspectMap: MutableSparseMap$Meta3dCommonlib.copy(state.aspectMap),
                      gameObjectMap: MutableSparseMap$Meta3dCommonlib.copy(state.gameObjectMap),
                      gameObjectPerspectiveCameraProjectionMap: MutableSparseMap$Meta3dCommonlib.copy(state.gameObjectPerspectiveCameraProjectionMap),
                      needDisposedPerspectiveCameraProjections: ArraySt$Meta3dCommonlib.copy(state.needDisposedPerspectiveCameraProjections),
                      disposedPerspectiveCameraProjections: ArraySt$Meta3dCommonlib.copy(state.disposedPerspectiveCameraProjections)
                    };
            })
        };
}

export {
  getContribute ,
}
/* No side effect */
