

import * as CreateTypeArrayDirectionLightUtils$Meta3dComponentWorkerUtils from "./../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/directionlight/CreateTypeArrayDirectionLightUtils.bs.js";

function createState(isDebug, directionLightCount, buffer) {
  var match = CreateTypeArrayDirectionLightUtils$Meta3dComponentWorkerUtils.createTypeArrays(buffer, directionLightCount);
  return {
          config: {
            isDebug: isDebug
          },
          colors: match[0],
          intensities: match[1]
        };
}

export {
  createState ,
  
}
/* No side effect */
