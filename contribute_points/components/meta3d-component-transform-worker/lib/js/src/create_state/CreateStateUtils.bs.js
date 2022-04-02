'use strict';

var CreateTypeArrayTransformUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/transform/CreateTypeArrayTransformUtils.bs.js");

function createState(isDebug, transformCount, buffer) {
  var match = CreateTypeArrayTransformUtils$Meta3dComponentWorkerUtils.createTypeArrays(buffer, transformCount);
  return {
          config: {
            isDebug: isDebug
          },
          localToWorldMatrices: match[0]
        };
}

exports.createState = createState;
/* No side effect */
