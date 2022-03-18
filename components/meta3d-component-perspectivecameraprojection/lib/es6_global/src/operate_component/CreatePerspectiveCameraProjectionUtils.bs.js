

import * as Matrix4$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/math/Matrix4.bs.js";
import * as IndexComponentUtils$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/IndexComponentUtils.bs.js";
import * as DirtyPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection from "../utils/DirtyPerspectiveCameraProjectionUtils.bs.js";
import * as OperatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection from "../utils/OperatePerspectiveCameraProjectionUtils.bs.js";

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

export {
  create ,
  
}
/* No side effect */
