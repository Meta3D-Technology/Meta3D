

import * as MutableSparseMap$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as IndexComponentUtils$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/IndexComponentUtils.bs.js";
import * as BufferComponentUtils$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/BufferComponentUtils.bs.js";
import * as ConfigUtils$Meta3dComponentTransform from "../config/ConfigUtils.bs.js";
import * as DirtyTransformUtils$Meta3dComponentTransform from "../operate_data/DirtyTransformUtils.bs.js";

var _isNotNeedInitData = MutableSparseMap$Meta3dCommonlib.has;

function _initDataWhenCreate(childrenMap, index) {
  if (MutableSparseMap$Meta3dCommonlib.has(childrenMap, index)) {
    return ;
  } else {
    MutableSparseMap$Meta3dCommonlib.set(childrenMap, index, []);
    return ;
  }
}

function create(state) {
  var index = state.maxIndex;
  var match = IndexComponentUtils$Meta3dCommonlib.generateIndex(state.disposedTransformArray, index);
  var index$1 = match[1];
  state.maxIndex = match[2];
  state.disposedTransformArray = match[0];
  _initDataWhenCreate(state.childrenMap, index$1);
  var state$1 = DirtyTransformUtils$Meta3dComponentTransform.mark(state, index$1, true);
  return [
          state$1,
          BufferComponentUtils$Meta3dCommonlib.checkNotExceedMaxCountByIndex(ConfigUtils$Meta3dComponentTransform.getIsDebug(state$1), index$1, ConfigUtils$Meta3dComponentTransform.getTransformCount(state$1))
        ];
}

export {
  _isNotNeedInitData ,
  _initDataWhenCreate ,
  create ,
  
}
/* No side effect */
