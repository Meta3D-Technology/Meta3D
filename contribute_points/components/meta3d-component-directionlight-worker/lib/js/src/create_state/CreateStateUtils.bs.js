'use strict';

var CreateTypeArrayDirectionLightUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/directionlight/CreateTypeArrayDirectionLightUtils.bs.js");

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

exports.createState = createState;
/* No side effect */
