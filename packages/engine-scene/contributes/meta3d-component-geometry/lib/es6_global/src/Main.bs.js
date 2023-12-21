

import * as Caml_obj from "../../../../../../../node_modules/rescript/lib/es6/caml_obj.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as TypeArrayUtils$Meta3dCommonlib from "../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/TypeArrayUtils.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as CopyTypeArrayService$Meta3dCommonlib from "../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/copy/CopyTypeArrayService.bs.js";
import * as Index$Meta3dComponentGeometryProtocol from "../../../../../../../node_modules/meta3d-component-geometry-protocol/lib/es6_global/src/Index.bs.js";
import * as AddGeometryUtils$Meta3dComponentGeometry from "./gameobject/AddGeometryUtils.bs.js";
import * as CreateStateUtils$Meta3dComponentGeometry from "./create_state/CreateStateUtils.bs.js";
import * as GetGeometryUtils$Meta3dComponentGeometry from "./gameobject/GetGeometryUtils.bs.js";
import * as HasGeometryUtils$Meta3dComponentGeometry from "./gameobject/HasGeometryUtils.bs.js";
import * as CloneGeometryUtils$Meta3dComponentGeometry from "./operate_component/CloneGeometryUtils.bs.js";
import * as CreateGeometryUtils$Meta3dComponentGeometry from "./operate_component/CreateGeometryUtils.bs.js";
import * as GetGameObjectsUtils$Meta3dComponentGeometry from "./gameobject/GetGameObjectsUtils.bs.js";
import * as RemoveGeometryUtils$Meta3dComponentGeometry from "./gameobject/RemoveGeometryUtils.bs.js";
import * as DisposeGeometryUtils$Meta3dComponentGeometry from "./operate_component/DisposeGeometryUtils.bs.js";
import * as GetAllGeometrysUtils$Meta3dComponentGeometry from "./operate_component/GetAllGeometrysUtils.bs.js";
import * as GetGeometryDataUtils$Meta3dComponentGeometry from "./operate_data/GetGeometryDataUtils.bs.js";
import * as SetGeometryDataUtils$Meta3dComponentGeometry from "./operate_data/SetGeometryDataUtils.bs.js";
import * as BufferGeometryUtils$Meta3dComponentWorkerUtils from "../../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/geometry/BufferGeometryUtils.bs.js";
import * as GetNeedDisposedGeometrysUtils$Meta3dComponentGeometry from "./gameobject/GetNeedDisposedGeometrysUtils.bs.js";

function _restoreTypeArrays(currentState, targetState) {
  CreateStateUtils$Meta3dComponentGeometry.setAllInfosDataToDefault([
        currentState.verticesInfos,
        currentState.texCoordsInfos,
        currentState.normalsInfos,
        currentState.tangentsInfos,
        currentState.indicesInfos
      ], currentState.maxIndex);
  TypeArrayUtils$Meta3dCommonlib.fillUint32ArrayWithUint32Array([
        currentState.verticesInfos,
        0
      ], [
        targetState.verticesInfos,
        0
      ], targetState.verticesInfos.length);
  TypeArrayUtils$Meta3dCommonlib.fillUint32ArrayWithUint32Array([
        currentState.texCoordsInfos,
        0
      ], [
        targetState.texCoordsInfos,
        0
      ], targetState.texCoordsInfos.length);
  TypeArrayUtils$Meta3dCommonlib.fillUint32ArrayWithUint32Array([
        currentState.normalsInfos,
        0
      ], [
        targetState.normalsInfos,
        0
      ], targetState.normalsInfos.length);
  TypeArrayUtils$Meta3dCommonlib.fillUint32ArrayWithUint32Array([
        currentState.tangentsInfos,
        0
      ], [
        targetState.tangentsInfos,
        0
      ], targetState.tangentsInfos.length);
  TypeArrayUtils$Meta3dCommonlib.fillUint32ArrayWithUint32Array([
        currentState.indicesInfos,
        0
      ], [
        targetState.indicesInfos,
        0
      ], targetState.indicesInfos.length);
  return [
          currentState,
          targetState
        ];
}

function getContribute(param) {
  return {
          componentName: Index$Meta3dComponentGeometryProtocol.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$Meta3dComponentGeometry.createState(param.isDebug, param.geometryPointCount, param.geometryCount);
            }),
          getGameObjectsFunc: (function (state, geometry) {
              return GetGameObjectsUtils$Meta3dComponentGeometry.get(state)(geometry);
            }),
          createComponentFunc: CreateGeometryUtils$Meta3dComponentGeometry.create,
          addComponentFunc: (function (state, gameObject, geometry) {
              return AddGeometryUtils$Meta3dComponentGeometry.add(state)(gameObject, geometry);
            }),
          removeComponentFunc: (function (state, gameObject, geometry) {
              return RemoveGeometryUtils$Meta3dComponentGeometry.remove(state)(gameObject, geometry);
            }),
          hasComponentFunc: (function (state, gameObject) {
              return HasGeometryUtils$Meta3dComponentGeometry.has(state)(gameObject);
            }),
          getComponentFunc: (function (state, gameObject) {
              return GetGeometryUtils$Meta3dComponentGeometry.get(state)(gameObject);
            }),
          getNeedDisposedComponentsFunc: GetNeedDisposedGeometrysUtils$Meta3dComponentGeometry.get,
          getComponentDataFunc: (function (state, geometry, dataName) {
              return GetGeometryDataUtils$Meta3dComponentGeometry.getData(state, geometry, dataName);
            }),
          setComponentDataFunc: (function (state, geometry, dataName, dataValue) {
              return SetGeometryDataUtils$Meta3dComponentGeometry.setData(state, geometry, dataName, dataValue);
            }),
          deferDisposeComponentFunc: (function (state, param) {
              return DisposeGeometryUtils$Meta3dComponentGeometry.deferDisposeComponent(state)([
                          param[0],
                          param[1]
                        ]);
            }),
          disposeComponentsFunc: DisposeGeometryUtils$Meta3dComponentGeometry.disposeComponents,
          cloneComponentFunc: (function (state, countRange, cloneConfig, sourceGeometry) {
              return CloneGeometryUtils$Meta3dComponentGeometry.clone(state, countRange, sourceGeometry);
            }),
          getAllComponentsFunc: GetAllGeometrysUtils$Meta3dComponentGeometry.getAll,
          restore: (function (currentState, targetState) {
              var match = _restoreTypeArrays(currentState, targetState);
              var currentState$1 = match[0];
              var newrecord = Caml_obj.obj_dup(match[1]);
              newrecord.indicesInfos = currentState$1.indicesInfos;
              newrecord.tangentsInfos = currentState$1.tangentsInfos;
              newrecord.normalsInfos = currentState$1.normalsInfos;
              newrecord.texCoordsInfos = currentState$1.texCoordsInfos;
              newrecord.verticesInfos = currentState$1.verticesInfos;
              newrecord.buffer = currentState$1.buffer;
              return newrecord;
            }),
          deepCopy: (function (state) {
              var maxIndex = state.maxIndex;
              var verticesInfos = state.verticesInfos;
              var texCoordsInfos = state.texCoordsInfos;
              var normalsInfos = state.normalsInfos;
              var tangentsInfos = state.tangentsInfos;
              var indicesInfos = state.indicesInfos;
              var gameObjectsMap = state.gameObjectsMap;
              var gameObjectGeometryMap = state.gameObjectGeometryMap;
              var needDisposedGeometrys = state.needDisposedGeometrys;
              var disposedGeometrys = state.disposedGeometrys;
              var infosEndIndex = Math.imul(maxIndex, BufferGeometryUtils$Meta3dComponentWorkerUtils.getInfoSize(undefined));
              var newrecord = Caml_obj.obj_dup(state);
              newrecord.disposedGeometrys = ArraySt$Meta3dCommonlib.copy(disposedGeometrys);
              newrecord.needDisposedGeometrys = ArraySt$Meta3dCommonlib.copy(needDisposedGeometrys);
              newrecord.gameObjectGeometryMap = MutableSparseMap$Meta3dCommonlib.copy(gameObjectGeometryMap);
              newrecord.gameObjectsMap = CopyTypeArrayService$Meta3dCommonlib.deepCopyMutableSparseMapOfArray(gameObjectsMap);
              newrecord.indicesInfos = CopyTypeArrayService$Meta3dCommonlib.copyUint32ArrayWithEndIndex(indicesInfos, infosEndIndex);
              newrecord.tangentsInfos = CopyTypeArrayService$Meta3dCommonlib.copyUint32ArrayWithEndIndex(tangentsInfos, infosEndIndex);
              newrecord.normalsInfos = CopyTypeArrayService$Meta3dCommonlib.copyUint32ArrayWithEndIndex(normalsInfos, infosEndIndex);
              newrecord.texCoordsInfos = CopyTypeArrayService$Meta3dCommonlib.copyUint32ArrayWithEndIndex(texCoordsInfos, infosEndIndex);
              newrecord.verticesInfos = CopyTypeArrayService$Meta3dCommonlib.copyUint32ArrayWithEndIndex(verticesInfos, infosEndIndex);
              return newrecord;
            })
        };
}

export {
  _restoreTypeArrays ,
  getContribute ,
}
/* No side effect */
