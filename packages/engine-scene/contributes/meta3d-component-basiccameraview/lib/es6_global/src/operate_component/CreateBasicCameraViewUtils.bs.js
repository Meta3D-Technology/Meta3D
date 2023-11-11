

import * as IndexComponentUtils$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/IndexComponentUtils.bs.js";

function create(state) {
  var index = state.maxIndex;
  var match = IndexComponentUtils$Meta3dCommonlib.generateIndex(state.disposedBasicCameraViews, index);
  return [
          {
            config: state.config,
            maxIndex: match[2],
            isActiveMap: state.isActiveMap,
            gameObjectMap: state.gameObjectMap,
            gameObjectBasicCameraViewMap: state.gameObjectBasicCameraViewMap,
            needDisposedBasicCameraViews: state.needDisposedBasicCameraViews,
            disposedBasicCameraViews: match[0],
            names: state.names
          },
          match[1]
        ];
}

export {
  create ,
}
/* No side effect */
