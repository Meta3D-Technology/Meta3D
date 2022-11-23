'use strict';

var ListSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ListSt.bs.js");
var CreateMapComponentUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/CreateMapComponentUtils.bs.js");
var BufferDirectionLightUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/directionlight/BufferDirectionLightUtils.bs.js");
var CreateTypeArrayDirectionLightUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/directionlight/CreateTypeArrayDirectionLightUtils.bs.js");
var OperateTypeArrayDirectionLightUtils$Meta3dComponentDirectionlight = require("../utils/OperateTypeArrayDirectionLightUtils.bs.js");

function _setAllTypeArrDataToDefault(param, count, param$1) {
  var defaultIntensity = param$1[1];
  var defaultColor = param$1[0];
  var intensities = param[1];
  var colors = param[0];
  ListSt$Meta3dCommonlib.forEach(ListSt$Meta3dCommonlib.range(0, count - 1 | 0), (function (index) {
          OperateTypeArrayDirectionLightUtils$Meta3dComponentDirectionlight.setColor(index, defaultColor, colors);
          OperateTypeArrayDirectionLightUtils$Meta3dComponentDirectionlight.setIntensity(index, defaultIntensity, intensities);
        }));
  return [
          colors,
          intensities
        ];
}

function _initBufferData(count, defaultDataTuple) {
  var buffer = BufferDirectionLightUtils$Meta3dComponentWorkerUtils.createBuffer(count);
  var typeArrData = _setAllTypeArrDataToDefault(CreateTypeArrayDirectionLightUtils$Meta3dComponentWorkerUtils.createTypeArrays(buffer, count), count, defaultDataTuple);
  return [
          buffer,
          typeArrData
        ];
}

function createStateWithSharedArrayBufferData(param, param$1) {
  var lightCount = param[1];
  var colors = param$1.colors;
  var intensities = param$1.intensities;
  return {
          config: {
            isDebug: param[0],
            directionLightCount: lightCount
          },
          maxIndex: 0,
          buffer: param$1.buffer,
          colors: colors,
          intensities: intensities,
          gameObjectMap: CreateMapComponentUtils$Meta3dCommonlib.createEmptyMap(lightCount),
          gameObjectDirectionLightMap: CreateMapComponentUtils$Meta3dCommonlib.createEmptyMap(lightCount),
          needDisposedDirectionLights: [],
          disposedDirectionLights: []
        };
}

function createState(isDebug, lightCount) {
  var match = _initBufferData(lightCount, [
        [
          1,
          1,
          1
        ],
        1.0
      ]);
  var match$1 = match[1];
  return createStateWithSharedArrayBufferData([
              isDebug,
              lightCount
            ], {
              buffer: match[0],
              colors: match$1[0],
              intensities: match$1[1]
            });
}

exports._setAllTypeArrDataToDefault = _setAllTypeArrDataToDefault;
exports._initBufferData = _initBufferData;
exports.createStateWithSharedArrayBufferData = createStateWithSharedArrayBufferData;
exports.createState = createState;
/* No side effect */
