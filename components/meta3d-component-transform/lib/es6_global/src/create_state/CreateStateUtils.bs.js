

import * as ListSt$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as CreateMapComponentUtils$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/component/CreateMapComponentUtils.bs.js";
import * as BufferTransformUtils$Meta3dComponentWorkerUtils from "./../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/transform/BufferTransformUtils.bs.js";
import * as OperateTypeArrayTransformUtils$Meta3dComponentTransform from "../utils/OperateTypeArrayTransformUtils.bs.js";
import * as CreateTypeArrayTransformUtils$Meta3dComponentWorkerUtils from "./../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/transform/CreateTypeArrayTransformUtils.bs.js";

function _setAllTypeArrDataToDefault(param, count, param$1) {
  var defaultLocalScale = param$1[3];
  var defaultLocalRotation = param$1[2];
  var defaultLocalPosition = param$1[1];
  var defaultLocalToWorldMatrix = param$1[0];
  var localScales = param[3];
  var localRotations = param[2];
  var localPositions = param[1];
  var localToWorldMatrices = param[0];
  ListSt$Meta3dCommonlib.forEach(ListSt$Meta3dCommonlib.range(0, count - 1 | 0), (function (index) {
          OperateTypeArrayTransformUtils$Meta3dComponentTransform.setLocalToWorldMatrix(index, defaultLocalToWorldMatrix, localToWorldMatrices);
          OperateTypeArrayTransformUtils$Meta3dComponentTransform.setLocalPosition(index, defaultLocalPosition, localPositions);
          OperateTypeArrayTransformUtils$Meta3dComponentTransform.setLocalRotation(index, defaultLocalRotation, localRotations);
          return OperateTypeArrayTransformUtils$Meta3dComponentTransform.setLocalScale(index, defaultLocalScale, localScales);
        }));
  return [
          localToWorldMatrices,
          localPositions,
          localRotations,
          localScales
        ];
}

function _initBufferData(count, defaultDataTuple) {
  var buffer = BufferTransformUtils$Meta3dComponentWorkerUtils.createBuffer(count);
  var typeArrData = _setAllTypeArrDataToDefault(CreateTypeArrayTransformUtils$Meta3dComponentWorkerUtils.createTypeArrays(buffer, count), count, defaultDataTuple);
  return [
          buffer,
          typeArrData
        ];
}

function createStateWithSharedArrayBufferData(param, param$1, param$2) {
  var transformCount = param[1];
  var localToWorldMatrices = param$2.localToWorldMatrices;
  var localPositions = param$2.localPositions;
  var localRotations = param$2.localRotations;
  var localScales = param$2.localScales;
  return {
          config: {
            isDebug: param[0],
            float9Array1: param[2],
            float32Array1: param[3],
            transformCount: transformCount
          },
          maxIndex: 0,
          buffer: param$2.buffer,
          localToWorldMatrices: localToWorldMatrices,
          localPositions: localPositions,
          localRotations: localRotations,
          localScales: localScales,
          defaultLocalToWorldMatrix: param$1[0],
          defaultLocalPosition: param$1[1],
          defaultLocalRotation: param$1[2],
          defaultLocalScale: param$1[3],
          parentMap: CreateMapComponentUtils$Meta3dCommonlib.createEmptyMap(transformCount),
          childrenMap: CreateMapComponentUtils$Meta3dCommonlib.createEmptyMap(transformCount),
          gameObjectMap: CreateMapComponentUtils$Meta3dCommonlib.createEmptyMap(transformCount),
          gameObjectTransformMap: CreateMapComponentUtils$Meta3dCommonlib.createEmptyMap(transformCount),
          dirtyMap: CreateMapComponentUtils$Meta3dCommonlib.createEmptyMap(transformCount)
        };
}

function createState(isDebug, transformCount, float9Array1, float32Array1) {
  var defaultLocalToWorldMatrix = [
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1
  ];
  var defaultLocalPosition = [
    0,
    0,
    0
  ];
  var defaultLocalRotation = [
    0,
    0,
    0,
    1
  ];
  var defaultLocalScale = [
    1,
    1,
    1
  ];
  var match = _initBufferData(transformCount, [
        defaultLocalToWorldMatrix,
        defaultLocalPosition,
        defaultLocalRotation,
        defaultLocalScale
      ]);
  var match$1 = match[1];
  return createStateWithSharedArrayBufferData([
              isDebug,
              transformCount,
              float9Array1,
              float32Array1
            ], [
              defaultLocalToWorldMatrix,
              defaultLocalPosition,
              defaultLocalRotation,
              defaultLocalScale
            ], {
              buffer: match[0],
              localToWorldMatrices: match$1[0],
              localPositions: match$1[1],
              localRotations: match$1[2],
              localScales: match$1[3]
            });
}

export {
  _setAllTypeArrDataToDefault ,
  _initBufferData ,
  createStateWithSharedArrayBufferData ,
  createState ,
  
}
/* No side effect */
