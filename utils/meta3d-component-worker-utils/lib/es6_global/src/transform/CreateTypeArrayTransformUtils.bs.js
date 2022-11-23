

import * as BufferTransformUtils$Meta3dComponentWorkerUtils from "./BufferTransformUtils.bs.js";

function createTypeArrays(buffer, count) {
  return [
          new Float32Array(buffer, BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalToWorldMatricesOffset(count), BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalToWorldMatricesLength(count)),
          new Float32Array(buffer, BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalPositionsOffset(count), BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalPositionsLength(count)),
          new Float32Array(buffer, BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalRotationsOffset(count), BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalRotationsLength(count)),
          new Float32Array(buffer, BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalScalesOffset(count), BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalScalesLength(count))
        ];
}

export {
  createTypeArrays ,
}
/* No side effect */
