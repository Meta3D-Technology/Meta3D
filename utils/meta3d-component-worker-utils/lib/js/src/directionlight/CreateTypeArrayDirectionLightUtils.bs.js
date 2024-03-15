'use strict';

var BufferDirectionLightUtils$Meta3dComponentWorkerUtils = require("./BufferDirectionLightUtils.bs.js");

function createTypeArrays(buffer, count) {
  return [
          new Float32Array(buffer, BufferDirectionLightUtils$Meta3dComponentWorkerUtils.getColorsOffset(count), BufferDirectionLightUtils$Meta3dComponentWorkerUtils.getColorsLength(count)),
          new Float32Array(buffer, BufferDirectionLightUtils$Meta3dComponentWorkerUtils.getIntensitiesOffset(count), BufferDirectionLightUtils$Meta3dComponentWorkerUtils.getIntensitiesLength(count))
        ];
}

exports.createTypeArrays = createTypeArrays;
/* No side effect */
