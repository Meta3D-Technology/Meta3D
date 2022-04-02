

import * as CreateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils from "./../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/pbrmaterial/CreateTypeArrayPBRMaterialUtils.bs.js";

function createState(isDebug, pbrMaterialCount, buffer) {
  var match = CreateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.createTypeArrays(buffer, pbrMaterialCount);
  return {
          config: {
            isDebug: isDebug
          },
          diffuseColors: match[0],
          speculars: match[1],
          specularColors: match[2],
          roughnesses: match[3],
          metalnesses: match[4],
          transmissions: match[5],
          iors: match[6]
        };
}

export {
  createState ,
  
}
/* No side effect */
