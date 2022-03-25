

import * as CreateTypeArrayTransformUtils$Meta3dComponentWorkerUtils from "./../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/transform/CreateTypeArrayTransformUtils.bs.js";

function createState(isDebug, transformCount, buffer) {
  var match = CreateTypeArrayTransformUtils$Meta3dComponentWorkerUtils.createTypeArrays(buffer, transformCount);
  return {
          config: {
            isDebug: isDebug
          },
          localToWorldMatrices: match[0]
        };
}

export {
  createState ,
  
}
/* No side effect */
