'use strict';

var IndexComponentUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/IndexComponentUtils.bs.js");

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

exports.create = create;
/* No side effect */
