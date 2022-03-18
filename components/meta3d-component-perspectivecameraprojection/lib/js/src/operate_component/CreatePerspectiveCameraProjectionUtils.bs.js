'use strict';

var Matrix4$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/math/Matrix4.bs.js");
var IndexComponentUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/IndexComponentUtils.bs.js");
var DirtyPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection = require("../utils/DirtyPerspectiveCameraProjectionUtils.bs.js");
var OperatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection = require("../utils/OperatePerspectiveCameraProjectionUtils.bs.js");

function create(state) {
  var index = state.maxIndex;
  var match = IndexComponentUtils$Meta3dCommonlib.generateIndex([], index);
  var index$1 = match[1];
  var state$1 = OperatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.setPMatrix(DirtyPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.mark(state, index$1, true), index$1, Matrix4$Meta3dCommonlib.createIdentityMatrix4(undefined));
  return [
          {
            config: state$1.config,
            maxIndex: match[2],
            dirtyMap: state$1.dirtyMap,
            pMatrixMap: state$1.pMatrixMap,
            nearMap: state$1.nearMap,
            farMap: state$1.farMap,
            fovyMap: state$1.fovyMap,
            aspectMap: state$1.aspectMap,
            gameObjectMap: state$1.gameObjectMap,
            gameObjectPerspectiveCameraProjectionMap: state$1.gameObjectPerspectiveCameraProjectionMap
          },
          index$1
        ];
}

exports.create = create;
/* No side effect */
