'use strict';

var Caml_obj = require("rescript/lib/js/caml_obj.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var TypeArrayUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/TypeArrayUtils.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var Index$Meta3dComponentGeometryProtocol = require("meta3d-component-geometry-protocol/lib/js/src/Index.bs.js");
var AddGeometryUtils$Meta3dComponentGeometry = require("./gameobject/AddGeometryUtils.bs.js");
var CreateStateUtils$Meta3dComponentGeometry = require("./create_state/CreateStateUtils.bs.js");
var GetGeometryUtils$Meta3dComponentGeometry = require("./gameobject/GetGeometryUtils.bs.js");
var HasGeometryUtils$Meta3dComponentGeometry = require("./gameobject/HasGeometryUtils.bs.js");
var CloneGeometryUtils$Meta3dComponentGeometry = require("./operate_component/CloneGeometryUtils.bs.js");
var CreateGeometryUtils$Meta3dComponentGeometry = require("./operate_component/CreateGeometryUtils.bs.js");
var GetGameObjectsUtils$Meta3dComponentGeometry = require("./gameobject/GetGameObjectsUtils.bs.js");
var RemoveGeometryUtils$Meta3dComponentGeometry = require("./gameobject/RemoveGeometryUtils.bs.js");
var DisposeGeometryUtils$Meta3dComponentGeometry = require("./operate_component/DisposeGeometryUtils.bs.js");
var GetAllGeometrysUtils$Meta3dComponentGeometry = require("./operate_component/GetAllGeometrysUtils.bs.js");
var GetGeometryDataUtils$Meta3dComponentGeometry = require("./operate_data/GetGeometryDataUtils.bs.js");
var SetGeometryDataUtils$Meta3dComponentGeometry = require("./operate_data/SetGeometryDataUtils.bs.js");
var CopyTypeArrayService$Meta3dComponentCommonlib = require("meta3d-component-commonlib/lib/js/src/copy/CopyTypeArrayService.bs.js");
var BufferGeometryUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/geometry/BufferGeometryUtils.bs.js");
var GetNeedDisposedGeometrysUtils$Meta3dComponentGeometry = require("./gameobject/GetNeedDisposedGeometrysUtils.bs.js");

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
              newrecord.gameObjectsMap = CopyTypeArrayService$Meta3dComponentCommonlib.deepCopyMutableSparseMapOfArray(gameObjectsMap);
              newrecord.indicesInfos = CopyTypeArrayService$Meta3dComponentCommonlib.copyUint32ArrayWithEndIndex(indicesInfos, infosEndIndex);
              newrecord.tangentsInfos = CopyTypeArrayService$Meta3dComponentCommonlib.copyUint32ArrayWithEndIndex(tangentsInfos, infosEndIndex);
              newrecord.normalsInfos = CopyTypeArrayService$Meta3dComponentCommonlib.copyUint32ArrayWithEndIndex(normalsInfos, infosEndIndex);
              newrecord.texCoordsInfos = CopyTypeArrayService$Meta3dComponentCommonlib.copyUint32ArrayWithEndIndex(texCoordsInfos, infosEndIndex);
              newrecord.verticesInfos = CopyTypeArrayService$Meta3dComponentCommonlib.copyUint32ArrayWithEndIndex(verticesInfos, infosEndIndex);
              return newrecord;
            })
        };
}

exports._restoreTypeArrays = _restoreTypeArrays;
exports.getContribute = getContribute;
/* No side effect */
