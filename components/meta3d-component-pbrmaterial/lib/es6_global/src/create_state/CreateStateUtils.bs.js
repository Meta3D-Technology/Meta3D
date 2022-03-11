

import * as ListSt$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as CreateMapComponentUtils$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/CreateMapComponentUtils.bs.js";
import * as BufferPBRMaterialUtils$Meta3dComponentWorkerUtils from "./../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/pbrmaterial/BufferPBRMaterialUtils.bs.js";
import * as CreateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils from "./../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/pbrmaterial/CreateTypeArrayPBRMaterialUtils.bs.js";
import * as OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial from "../utils/OperateTypeArrayPBRMaterialUtils.bs.js";

function _setAllTypeArrDataToDefault(param, count, param$1) {
  var defaultIOR = param$1[6];
  var defaultTransmission = param$1[5];
  var defaultMetalness = param$1[4];
  var defaultRoughness = param$1[3];
  var defaultSpecularColor = param$1[2];
  var defaultSpecular = param$1[1];
  var defaultDiffuseColor = param$1[0];
  var iors = param[6];
  var transmissions = param[5];
  var metalnesses = param[4];
  var roughnesses = param[3];
  var specularColors = param[2];
  var speculars = param[1];
  var diffuseColors = param[0];
  ListSt$Meta3dCommonlib.forEach(ListSt$Meta3dCommonlib.range(0, count - 1 | 0), (function (index) {
          OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setDiffuseColor(index, defaultDiffuseColor, diffuseColors);
          OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setSpecular(index, defaultSpecular, speculars);
          OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setSpecularColor(index, defaultSpecularColor, specularColors);
          OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setRoughness(index, defaultRoughness, roughnesses);
          OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setMetalness(index, defaultMetalness, metalnesses);
          OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setTransmission(index, defaultTransmission, transmissions);
          return OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setIOR(index, defaultIOR, iors);
        }));
  return [
          diffuseColors,
          speculars,
          specularColors,
          roughnesses,
          metalnesses,
          transmissions,
          iors
        ];
}

function _initBufferData(count, defaultDataTuple) {
  var buffer = BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.createBuffer(count);
  var typeArrData = _setAllTypeArrDataToDefault(CreateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.createTypeArrays(buffer, count), count, defaultDataTuple);
  return [
          buffer,
          typeArrData
        ];
}

function createStateWithSharedArrayBufferData(param, param$1, param$2) {
  var pbrMaterialCount = param[1];
  var diffuseColors = param$2.diffuseColors;
  var speculars = param$2.speculars;
  var specularColors = param$2.specularColors;
  var roughnesses = param$2.roughnesses;
  var metalnesses = param$2.metalnesses;
  var transmissions = param$2.transmissions;
  var iors = param$2.iors;
  return {
          config: {
            isDebug: param[0],
            pbrMaterialCount: pbrMaterialCount
          },
          maxIndex: 0,
          buffer: param$2.buffer,
          diffuseColors: diffuseColors,
          speculars: speculars,
          specularColors: specularColors,
          roughnesses: roughnesses,
          metalnesses: metalnesses,
          transmissions: transmissions,
          iors: iors,
          defaultDiffuseColor: param$1[0],
          defaultSpecular: param$1[1],
          defaultSpecularColor: param$1[2],
          defaultRoughness: param$1[3],
          defaultMetalness: param$1[4],
          defaultTransmission: param$1[5],
          defaultIOR: param$1[6],
          gameObjectsMap: CreateMapComponentUtils$Meta3dCommonlib.createEmptyMap(pbrMaterialCount),
          gameObjectPBRMaterialMap: CreateMapComponentUtils$Meta3dCommonlib.createEmptyMap(pbrMaterialCount),
          diffuseMapMap: CreateMapComponentUtils$Meta3dCommonlib.createEmptyMap(pbrMaterialCount),
          channelRoughnessMetallicMapMap: CreateMapComponentUtils$Meta3dCommonlib.createEmptyMap(pbrMaterialCount),
          emissionMapMap: CreateMapComponentUtils$Meta3dCommonlib.createEmptyMap(pbrMaterialCount),
          normalMapMap: CreateMapComponentUtils$Meta3dCommonlib.createEmptyMap(pbrMaterialCount),
          transmissionMapMap: CreateMapComponentUtils$Meta3dCommonlib.createEmptyMap(pbrMaterialCount),
          specularMapMap: CreateMapComponentUtils$Meta3dCommonlib.createEmptyMap(pbrMaterialCount),
          needDisposedPBRMaterialArray: CreateMapComponentUtils$Meta3dCommonlib.createEmptyMap(pbrMaterialCount),
          disposedPBRMaterialArray: []
        };
}

function createState(isDebug, pbrMaterialCount) {
  var defaultDiffuseColor = [
    1,
    1,
    1
  ];
  var defaultSpecularColor = [
    1,
    1,
    1
  ];
  var match = _initBufferData(pbrMaterialCount, [
        defaultDiffuseColor,
        1.0,
        defaultSpecularColor,
        1.0,
        1.0,
        0.0,
        1.5
      ]);
  var match$1 = match[1];
  return createStateWithSharedArrayBufferData([
              isDebug,
              pbrMaterialCount
            ], [
              defaultDiffuseColor,
              1.0,
              defaultSpecularColor,
              1.0,
              1.0,
              0.0,
              1.5
            ], {
              buffer: match[0],
              diffuseColors: match$1[0],
              speculars: match$1[1],
              specularColors: match$1[2],
              roughnesses: match$1[3],
              metalnesses: match$1[4],
              transmissions: match$1[5],
              iors: match$1[6]
            });
}

export {
  _setAllTypeArrDataToDefault ,
  _initBufferData ,
  createStateWithSharedArrayBufferData ,
  createState ,
  
}
/* No side effect */
