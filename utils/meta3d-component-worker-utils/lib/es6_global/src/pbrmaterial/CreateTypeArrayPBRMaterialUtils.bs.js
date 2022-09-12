

import * as BufferPBRMaterialUtils$Meta3dComponentWorkerUtils from "./BufferPBRMaterialUtils.bs.js";

function createTypeArrays(buffer, count) {
  return [
          new Float32Array(buffer, BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getDiffuseColorsOffset(count), BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getDiffuseColorsLength(count)),
          new Float32Array(buffer, BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getSpecularsOffset(count), BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getSpecularsLength(count)),
          new Float32Array(buffer, BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getSpecularColorsOffset(count), BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getSpecularColorsLength(count)),
          new Float32Array(buffer, BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getRoughnessesOffset(count), BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getRoughnessesLength(count)),
          new Float32Array(buffer, BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getMetalnessesOffset(count), BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getMetalnessesLength(count)),
          new Float32Array(buffer, BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getTransmissionsOffset(count), BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getTransmissionsLength(count)),
          new Float32Array(buffer, BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getIORsOffset(count), BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getIORsLength(count))
        ];
}

export {
  createTypeArrays ,
  
}
/* No side effect */
