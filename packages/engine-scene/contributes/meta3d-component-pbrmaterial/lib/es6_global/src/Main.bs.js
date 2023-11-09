

import * as Caml_obj from "../../../../../node_modules/rescript/lib/es6/caml_obj.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as TypeArrayUtils$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/TypeArrayUtils.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as CopyTypeArrayService$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/copy/CopyTypeArrayService.bs.js";
import * as Index$Meta3dComponentPbrmaterialProtocol from "../../../../../node_modules/meta3d-component-pbrmaterial-protocol/lib/es6_global/src/Index.bs.js";
import * as CreateStateUtils$Meta3dComponentPbrmaterial from "./create_state/CreateStateUtils.bs.js";
import * as AddPBRMaterialUtils$Meta3dComponentPbrmaterial from "./gameobject/AddPBRMaterialUtils.bs.js";
import * as GetGameObjectsUtils$Meta3dComponentPbrmaterial from "./gameobject/GetGameObjectsUtils.bs.js";
import * as GetPBRMaterialUtils$Meta3dComponentPbrmaterial from "./gameobject/GetPBRMaterialUtils.bs.js";
import * as HasPBRMaterialUtils$Meta3dComponentPbrmaterial from "./gameobject/HasPBRMaterialUtils.bs.js";
import * as ClonePBRMaterialUtils$Meta3dComponentPbrmaterial from "./operate_component/ClonePBRMaterialUtils.bs.js";
import * as BufferPBRMaterialUtils$Meta3dComponentWorkerUtils from "../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/pbrmaterial/BufferPBRMaterialUtils.bs.js";
import * as CreatePBRMaterialUtils$Meta3dComponentPbrmaterial from "./operate_component/CreatePBRMaterialUtils.bs.js";
import * as RemovePBRMaterialUtils$Meta3dComponentPbrmaterial from "./gameobject/RemovePBRMaterialUtils.bs.js";
import * as DisposePBRMaterialUtils$Meta3dComponentPbrmaterial from "./operate_component/DisposePBRMaterialUtils.bs.js";
import * as GetAllPBRMaterialsUtils$Meta3dComponentPbrmaterial from "./operate_component/GetAllPBRMaterialsUtils.bs.js";
import * as GetPBRMaterialDataUtils$Meta3dComponentPbrmaterial from "./operate_data/GetPBRMaterialDataUtils.bs.js";
import * as SetPBRMaterialDataUtils$Meta3dComponentPbrmaterial from "./operate_data/SetPBRMaterialDataUtils.bs.js";
import * as GetNeedDisposedPBRMaterialsUtils$Meta3dComponentPbrmaterial from "./gameobject/GetNeedDisposedPBRMaterialsUtils.bs.js";

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

function getContribute(api) {
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
              newrecord.metalnessMap = MutableSparseMap$Meta3dCommonlib.copy(state.metalnessMap);
              newrecord.roughnessMap = MutableSparseMap$Meta3dCommonlib.copy(state.roughnessMap);
              newrecord.diffuseMap = MutableSparseMap$Meta3dCommonlib.copy(state.diffuseMap);
              newrecord.gameObjectPBRMaterialMap = MutableSparseMap$Meta3dCommonlib.copy(gameObjectPBRMaterialMap);
              newrecord.gameObjectsMap = CopyTypeArrayService$Meta3dCommonlib.deepCopyMutableSparseMapOfArray(gameObjectsMap);
              newrecord.iors = CopyTypeArrayService$Meta3dCommonlib.copyFloat32ArrayWithEndIndex(iors, Math.imul(maxIndex, BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getIORsSize(undefined)));
              newrecord.transmissions = CopyTypeArrayService$Meta3dCommonlib.copyFloat32ArrayWithEndIndex(transmissions, Math.imul(maxIndex, BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getTransmissionsSize(undefined)));
              newrecord.metalnesses = CopyTypeArrayService$Meta3dCommonlib.copyFloat32ArrayWithEndIndex(metalnesses, Math.imul(maxIndex, BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getMetalnessesSize(undefined)));
              newrecord.roughnesses = CopyTypeArrayService$Meta3dCommonlib.copyFloat32ArrayWithEndIndex(roughnesses, Math.imul(maxIndex, BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getRoughnessesSize(undefined)));
              newrecord.specularColors = CopyTypeArrayService$Meta3dCommonlib.copyFloat32ArrayWithEndIndex(specularColors, Math.imul(maxIndex, BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getSpecularColorsSize(undefined)));
              newrecord.speculars = CopyTypeArrayService$Meta3dCommonlib.copyFloat32ArrayWithEndIndex(speculars, Math.imul(maxIndex, BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getSpecularsSize(undefined)));
              newrecord.diffuseColors = CopyTypeArrayService$Meta3dCommonlib.copyFloat32ArrayWithEndIndex(diffuseColors, Math.imul(maxIndex, BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getDiffuseColorsSize(undefined)));
              return newrecord;
            })
        };
}

export {
  _restoreTypeArrays ,
  getContribute ,
}
/* No side effect */
