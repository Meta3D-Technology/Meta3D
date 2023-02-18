

import * as ListSt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as CreateMapComponentUtils$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/CreateMapComponentUtils.bs.js";
import * as BufferDirectionLightUtils$Meta3dComponentWorkerUtils from "../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/directionlight/BufferDirectionLightUtils.bs.js";
import * as CreateTypeArrayDirectionLightUtils$Meta3dComponentWorkerUtils from "../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/directionlight/CreateTypeArrayDirectionLightUtils.bs.js";
import * as OperateTypeArrayDirectionLightUtils$Meta3dComponentDirectionlight from "../utils/OperateTypeArrayDirectionLightUtils.bs.js";

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

export {
  _setAllTypeArrDataToDefault ,
  _initBufferData ,
  createStateWithSharedArrayBufferData ,
  createState ,
}
/* No side effect */
