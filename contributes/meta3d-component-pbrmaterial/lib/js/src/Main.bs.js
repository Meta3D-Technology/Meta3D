'use strict';

var Caml_obj = require("rescript/lib/js/caml_obj.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var TypeArrayUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/TypeArrayUtils.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var Index$Meta3dComponentPbrmaterialProtocol = require("meta3d-component-pbrmaterial-protocol/lib/js/src/Index.bs.js");
var CreateStateUtils$Meta3dComponentPbrmaterial = require("./create_state/CreateStateUtils.bs.js");
var CopyTypeArrayService$Meta3dComponentCommonlib = require("meta3d-component-commonlib/lib/js/src/copy/CopyTypeArrayService.bs.js");
var AddPBRMaterialUtils$Meta3dComponentPbrmaterial = require("./gameobject/AddPBRMaterialUtils.bs.js");
var GetGameObjectsUtils$Meta3dComponentPbrmaterial = require("./gameobject/GetGameObjectsUtils.bs.js");
var GetPBRMaterialUtils$Meta3dComponentPbrmaterial = require("./gameobject/GetPBRMaterialUtils.bs.js");
var HasPBRMaterialUtils$Meta3dComponentPbrmaterial = require("./gameobject/HasPBRMaterialUtils.bs.js");
var ClonePBRMaterialUtils$Meta3dComponentPbrmaterial = require("./operate_component/ClonePBRMaterialUtils.bs.js");
var BufferPBRMaterialUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/pbrmaterial/BufferPBRMaterialUtils.bs.js");
var CreatePBRMaterialUtils$Meta3dComponentPbrmaterial = require("./operate_component/CreatePBRMaterialUtils.bs.js");
var RemovePBRMaterialUtils$Meta3dComponentPbrmaterial = require("./gameobject/RemovePBRMaterialUtils.bs.js");
var DisposePBRMaterialUtils$Meta3dComponentPbrmaterial = require("./operate_component/DisposePBRMaterialUtils.bs.js");
var GetAllPBRMaterialsUtils$Meta3dComponentPbrmaterial = require("./operate_component/GetAllPBRMaterialsUtils.bs.js");
var GetPBRMaterialDataUtils$Meta3dComponentPbrmaterial = require("./operate_data/GetPBRMaterialDataUtils.bs.js");
var SetPBRMaterialDataUtils$Meta3dComponentPbrmaterial = require("./operate_data/SetPBRMaterialDataUtils.bs.js");
var GetNeedDisposedPBRMaterialsUtils$Meta3dComponentPbrmaterial = require("./gameobject/GetNeedDisposedPBRMaterialsUtils.bs.js");

function _restoreTypeArrays(currentState, targetState) {
  if (currentState.diffuseColors === targetState.diffuseColors && currentState.speculars === targetState.speculars && currentState.specularColors === targetState.specularColors && currentState.roughnesses === targetState.roughnesses && currentState.metalnesses === targetState.metalnesses && currentState.transmissions === targetState.transmissions && currentState.iors === targetState.iors) {
    return [
            currentState,
            targetState
          ];
  } else {
    CreateStateUtils$Meta3dComponentPbrmaterial.setAllTypeArrDataToDefault([
          currentState.diffuseColors,
          currentState.speculars,
          currentState.specularColors,
          currentState.roughnesses,
          currentState.metalnesses,
          currentState.transmissions,
          currentState.iors
        ], currentState.maxIndex, [
          currentState.defaultDiffuseColor,
          currentState.defaultSpecular,
          currentState.defaultSpecularColor,
          currentState.defaultRoughness,
          currentState.defaultMetalness,
          currentState.defaultTransmission,
          currentState.defaultIOR
        ]);
    TypeArrayUtils$Meta3dCommonlib.fillFloat32ArrayWithFloat32Array([
          currentState.diffuseColors,
          0
        ], [
          targetState.diffuseColors,
          0
        ], targetState.diffuseColors.length);
    TypeArrayUtils$Meta3dCommonlib.fillFloat32ArrayWithFloat32Array([
          currentState.speculars,
          0
        ], [
          targetState.speculars,
          0
        ], targetState.speculars.length);
    TypeArrayUtils$Meta3dCommonlib.fillFloat32ArrayWithFloat32Array([
          currentState.specularColors,
          0
        ], [
          targetState.specularColors,
          0
        ], targetState.specularColors.length);
    TypeArrayUtils$Meta3dCommonlib.fillFloat32ArrayWithFloat32Array([
          currentState.roughnesses,
          0
        ], [
          targetState.roughnesses,
          0
        ], targetState.roughnesses.length);
    TypeArrayUtils$Meta3dCommonlib.fillFloat32ArrayWithFloat32Array([
          currentState.metalnesses,
          0
        ], [
          targetState.metalnesses,
          0
        ], targetState.metalnesses.length);
    TypeArrayUtils$Meta3dCommonlib.fillFloat32ArrayWithFloat32Array([
          currentState.transmissions,
          0
        ], [
          targetState.transmissions,
          0
        ], targetState.transmissions.length);
    TypeArrayUtils$Meta3dCommonlib.fillFloat32ArrayWithFloat32Array([
          currentState.iors,
          0
        ], [
          targetState.iors,
          0
        ], targetState.iors.length);
    return [
            currentState,
            targetState
          ];
  }
}

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
          getAllComponentsFunc: GetAllPBRMaterialsUtils$Meta3dComponentPbrmaterial.getAll,
          restore: (function (currentState, targetState) {
              var match = _restoreTypeArrays(currentState, targetState);
              var currentState$1 = match[0];
              var newrecord = Caml_obj.obj_dup(match[1]);
              newrecord.iors = currentState$1.iors;
              newrecord.transmissions = currentState$1.transmissions;
              newrecord.metalnesses = currentState$1.metalnesses;
              newrecord.roughnesses = currentState$1.roughnesses;
              newrecord.specularColors = currentState$1.specularColors;
              newrecord.speculars = currentState$1.speculars;
              newrecord.diffuseColors = currentState$1.diffuseColors;
              newrecord.buffer = currentState$1.buffer;
              return newrecord;
            }),
          deepCopy: (function (state) {
              var maxIndex = state.maxIndex;
              var diffuseColors = state.diffuseColors;
              var speculars = state.speculars;
              var specularColors = state.specularColors;
              var roughnesses = state.roughnesses;
              var metalnesses = state.metalnesses;
              var transmissions = state.transmissions;
              var iors = state.iors;
              var gameObjectsMap = state.gameObjectsMap;
              var gameObjectPBRMaterialMap = state.gameObjectPBRMaterialMap;
              var needDisposedPBRMaterials = state.needDisposedPBRMaterials;
              var disposedPBRMaterials = state.disposedPBRMaterials;
              var newrecord = Caml_obj.obj_dup(state);
              newrecord.disposedPBRMaterials = ArraySt$Meta3dCommonlib.copy(disposedPBRMaterials);
              newrecord.needDisposedPBRMaterials = ArraySt$Meta3dCommonlib.copy(needDisposedPBRMaterials);
              newrecord.specularMapMap = MutableSparseMap$Meta3dCommonlib.copy(state.specularMapMap);
              newrecord.transmissionMapMap = MutableSparseMap$Meta3dCommonlib.copy(state.transmissionMapMap);
              newrecord.normalMapMap = MutableSparseMap$Meta3dCommonlib.copy(state.normalMapMap);
              newrecord.emissionMapMap = MutableSparseMap$Meta3dCommonlib.copy(state.emissionMapMap);
              newrecord.channelRoughnessMetallicMapMap = MutableSparseMap$Meta3dCommonlib.copy(state.channelRoughnessMetallicMapMap);
              newrecord.diffuseMapMap = MutableSparseMap$Meta3dCommonlib.copy(state.diffuseMapMap);
              newrecord.gameObjectPBRMaterialMap = MutableSparseMap$Meta3dCommonlib.copy(gameObjectPBRMaterialMap);
              newrecord.gameObjectsMap = CopyTypeArrayService$Meta3dComponentCommonlib.deepCopyMutableSparseMapOfArray(gameObjectsMap);
              newrecord.iors = CopyTypeArrayService$Meta3dComponentCommonlib.copyFloat32ArrayWithEndIndex(iors, Math.imul(maxIndex, BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getIORsSize(undefined)));
              newrecord.transmissions = CopyTypeArrayService$Meta3dComponentCommonlib.copyFloat32ArrayWithEndIndex(transmissions, Math.imul(maxIndex, BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getTransmissionsSize(undefined)));
              newrecord.metalnesses = CopyTypeArrayService$Meta3dComponentCommonlib.copyFloat32ArrayWithEndIndex(metalnesses, Math.imul(maxIndex, BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getMetalnessesSize(undefined)));
              newrecord.roughnesses = CopyTypeArrayService$Meta3dComponentCommonlib.copyFloat32ArrayWithEndIndex(roughnesses, Math.imul(maxIndex, BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getRoughnessesSize(undefined)));
              newrecord.specularColors = CopyTypeArrayService$Meta3dComponentCommonlib.copyFloat32ArrayWithEndIndex(specularColors, Math.imul(maxIndex, BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getSpecularColorsSize(undefined)));
              newrecord.speculars = CopyTypeArrayService$Meta3dComponentCommonlib.copyFloat32ArrayWithEndIndex(speculars, Math.imul(maxIndex, BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getSpecularsSize(undefined)));
              newrecord.diffuseColors = CopyTypeArrayService$Meta3dComponentCommonlib.copyFloat32ArrayWithEndIndex(diffuseColors, Math.imul(maxIndex, BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getDiffuseColorsSize(undefined)));
              return newrecord;
            })
        };
}

exports._restoreTypeArrays = _restoreTypeArrays;
exports.getContribute = getContribute;
/* No side effect */
